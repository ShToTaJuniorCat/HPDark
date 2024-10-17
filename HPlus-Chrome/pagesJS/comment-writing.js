/*
Oh boy do I have a story to tell you. Listen up.
So you know how there are buttons, when writing a comment,
that let you add tags such as [B] and [CODE]?
Yeah... so about those.
They call a function that is called simpletag.
It's parameter is the tag's name.
So far so good, right?
After that, among other things, it checks how many opening tags
with no closers there are for this tag (I'll refer to opening-without-closing as OWC).
There is a single variable for each tag that counts those OWC.
For example, there is a variable B_open that counts OWC for [B].
This variable is initalized `var B_open = 0;` along with:
var I_open = 0;
var U_open = 0;
var QUOTE_open = 0;
var CODE_open = 0;
var YOUTUBE_open = 0;
var SQL_open = 0;
var HTML_open = 0;

Which is a little messed up, I mean you could have had a dictionary
that has the values for each tag like { 'B' : 0, 'CODE' : 0 },
but you know what, fine, you do you.
But then, oh then, comes along the absolute abomination that is called
'simpletag'. As I mentioned earlier, it takes the tag's name,
but to access the variables I mentined earlier, it does this absolute horror:
eval(thetag + "_open");
Where 'thetag' is the parameter.
DID YOU REALLY NOT FIND ANY BETTER SOLUTION THAN USING FUCKING EVAL????????
anyways, what it means for me, is that I need to inject
a specialized variable for every tag that doesn't appear there.
Which is only possible by creating a new script and appending it into
the HTML. I hate it, you hate it, we all hate it.
*/
let s = document.createElement('script');
s.src = chrome.runtime.getURL('/pagesJS/JS-for-comment.js');
s.onload = function() { this.remove(); };
// see also "Dynamic values in the injected code" section in this answer
(document.head || document.documentElement).appendChild(s);

function addBBCodeButton(tag, buttonName, buttonStyle, childNumber) {
    let $sButton = $('<input>', {
        type: 'button',
        value: ` ${tag} `,
        class: 'codebuttons',
        name: tag,
        style: buttonStyle
    });

    $sButton.attr("onclick", `simpletag('${tag}');`);
    $sButton.attr("onmouseover", `hstat('${buttonName}');`);

    /* Yes this is awful but I can explain.
    The element I want to select is a TD,
    with class "pformright", but there may be
    up to 7 different of these. It doesnt
    have an ID, so this is the only way I can
    select it. It also changes it's index in
    the list under certain circumstances.
    However, it's the only one among those
    that has over 20 children, so I resorted
    to select it using that filter. */
    $('.pformright').filter(function() {
        return $(this).children().length > 20;
    }).eq(0).children().eq(childNumber).after($sButton);

    $sButton.before(' ');
    $sButton.after(' ');
}

window.onload = function () {
    // --------------------------------------------
    // Add "edited by" line by default
    chrome.storage.sync.get({ addEdited: false }, function(data) { 
        $('[name="add_edit"]').prop('checked', data.addEdited);
    });
    //---------------------------------------------

    // --------------------------------------------
    // Customise color in color selection GUI
    chrome.storage.sync.get({ colors: false }, function(data) {
        // Check if the colors are set (default is false, therefore not set)
        if(data.colors != false && typeof(data.colors) == "object" && !jQuery.isEmptyObject(data.colors)) {
            const colorNames = Object.keys(data.colors);
            
            const $fcolor = $('[name="fcolor"]');
            
            $fcolor.children(':gt(0)').remove();
            
            $.each(colorNames, function(i, colorName) {
                const $option = $('<option>', {
                    value: colorName,
                    style: 'color: ' + colorName,
                    text: data.colors[colorName]
                });
                $fcolor.append($option);
            });            
        }
    });
    // --------------------------------------------

    // --------------------------------------------
    // Add BBCode buttons
    chrome.storage.sync.get({ addStrikethrough: true, addQuote: false, addHTML: false, addSQL: false }, function(data) {
        if(data.addStrikethrough) {
            addBBCodeButton("S", "strikethrough", "text-decoration: line-through", 2);
        }

        if(data.addHTML) {
            addBBCodeButton("HTML", "HTML", "", 18);
        }

        if(data.addSQL) {
            addBBCodeButton("SQL", "SQL", "", 19);
        }

        // Add quote origin, timestamp for quote block
        if(data.addQuote) {
            // Create and append input elements
            const createInput = (id, placeholder) => {
                return $('<input>', {
                    type: 'text',
                    size: 14,
                    id: id,
                    placeholder: placeholder
                });
            };

            let quoteOriginInput = createInput('quoteOriginInput', 'מקור...');
            let quoteTimeInput = createInput('quoteTimeInput', 'זמן...');

            // Append the first input as the second child of the specified element
            $('#qlol div.bbcodew').children().eq(0).after(quoteOriginInput);

            // Append the second input right after the first one
            quoteOriginInput.after(quoteTimeInput);
        }
    });
    // --------------------------------------------
}