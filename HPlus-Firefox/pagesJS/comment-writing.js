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
DID YOU REALLY NOT FIND ANY BETTER SOLUTION THAT USING FUCKING EVAL????????
anyways, what it means for me, is that I need to inject
a specialized variable for every tag that doesn't appear there.
Which is only possible by creating a new script and appending it into
the HTML. I hate it, you hate it, we all hate it.
*/
function injectScript(scriptCont) {
    const $script = $('<script>').text(scriptCont);
    ($('head').length ? $('head') : $('html')).append($script);
    $script.remove(); // Clean up the injected script tag
}

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
    browser.storage.sync.get({ addEdited: false }, function(data) { 
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
        // Add the help line for youtube anyways, cuz why not
        let scriptToInject = "const help_youtube = 'הוסף סרטון יוטיוב';";

        if(data.addStrikethrough) {
            addBBCodeButton("S", "strikethrough", "text-decoration: line-through", 2);

            scriptToInject += "let S_open = 0;\
                               const help_strikethrough = 'הוסף טקסט עם קו חוצה';";
        }

        if(data.addHTML) {
            addBBCodeButton("HTML", "HTML", "", 18);

            scriptToInject += "const help_HTML = 'הוסף קוד HTML';";
        }

        if(data.addSQL) {
            addBBCodeButton("SQL", "SQL", "", 19);

            scriptToInject += "const help_SQL = 'הוסף קוד SQL';";
        }

        // Add quote origin, timestamp for quote block
        if(data.addQuote) {
            scriptToInject += "function tag_q() {\
                            let quotedText = document.getElementById('qurl').value;\
                            let quoteOrigin = document.getElementById('quoteOriginInput').value;\
                            let quoteTime = document.getElementById('quoteTimeInput').value;\
                        \
                            if (!quotedText) {\
                                alert(\"עליך להכניס ציטוט כלשהוא, או ללחוץ על ביטול\");\
                                return;\
                            } else if (!quoteOrigin && !quoteTime) {\
                                doInsert(\"[QUOTE]\" + quotedText + \"[/QUOTE]\", \"\", false);\
                            } else if(quoteOrigin && quoteTime) {\
                                doInsert(\"[QUOTE=\" + quoteOrigin + \",\" + quoteTime + \"]\" + quotedText + \"[/QUOTE]\", \"\", false);\
                            } else if(!quoteOrigin) {\
                                doInsert(\"[QUOTE= ,\" + quoteTime + \"]\" + quotedText + \"[/QUOTE]\", \"\", false);\
                            } else {\
                                doInsert(\"[QUOTE=\" + quoteOrigin + \"]\" + quotedText + \"[/QUOTE]\", \"\", false);\
                            }\
                        \
                            document.getElementById('qlol').style.visibility = 'hidden';\
                        }";

            let $quoteFinishButton = $('#qlol input[type="button"][value="סיים"]');

            $quoteFinishButton.attr("onclick", "tag_q();")

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

        injectScript(scriptToInject);
    });
    // --------------------------------------------
}