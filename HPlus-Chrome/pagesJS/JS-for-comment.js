// For some reason the browser gets hebrew charactes from here as gibberish.
// Couldn't be bothered to actually check it. This works.

function tag_q() {
    let quotedText = document.getElementById('qurl').value;
    let quoteOrigin = document.getElementById('quoteOriginInput').value;
    let quoteTime = document.getElementById('quoteTimeInput').value;

    if (!quotedText) {
        alert("\u05E2\u05DC\u05D9\u05DA\u0020\u05DC\u05D4\u05DB\u05E0\u05D9\u05E1\
\u0020\u05E6\u05D9\u05D8\u05D5\u05D8\u0020\u05DB\u05DC\u05E9\u05D4\
\u05D5\u05D0\u002C\u0020\u05D0\u05D5\u0020\u05DC\u05DC\u05D7\u05D5\
\u05E5\u0020\u05E2\u05DC\u0020\u05D1\u05D9\u05D8\u05D5\u05DC");
        return;
    } else if (!quoteOrigin && !quoteTime) {
        doInsert("[QUOTE]" + quotedText + "[/QUOTE]", "", false);
    } else if(quoteOrigin && quoteTime) {
        doInsert("[QUOTE=" + quoteOrigin + "," + quoteTime + "]" + quotedText + "[/QUOTE]", "", false);
    } else if(!quoteOrigin) {
        doInsert("[QUOTE= ," + quoteTime + "]" + quotedText + "[/QUOTE]", "", false);
    } else {
        doInsert("[QUOTE=" + quoteOrigin + "]" + quotedText + "[/QUOTE]", "", false);
    }

    document.getElementById('qlol').style.visibility = 'hidden';
}

const help_SQL = '\u05D4\u05D5\u05E1\u05E3\u0020\u05E7\u05D5\u05D3\u0020\u0053\u0051\u004C';
const help_HTML = '\u05D4\u05D5\u05E1\u05E3\u0020\u05E7\u05D5\u05D3\u0020\u0048\u0054\u004D\u004C';
const help_strikethrough = '\u05D4\u05D5\u05E1\u05E3\u0020\u05D8\u05E7\u05E1\u05D8\u0020\u05E2\
\u05DD\u0020\u05E7\u05D5\u0020\u05D7\u05D5\u05E6\u05D4';
const help_youtube = '\u05D4\u05D5\u05E1\u05E3\u0020\u05E1\u05E8\u05D8\u05D5\u05DF\
\u0020\u05D9\u05D5\u05D8\u05D9\u05D5\u05D1'; // Add the help line for youtube, cuz why not
let S_open = 0;