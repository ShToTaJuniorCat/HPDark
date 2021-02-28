// Yes, this code is ugly. Very ugly. I know, I feel you. But, if you have a tested idea of how to make it 
// better, more efficient, prettier or anything like that - please reach out to me.
if(new URLSearchParams(location.search).get('username') != null) {
    document.getElementsByName("username")[0].value = unescape(new URLSearchParams(location.search).get('username')); // Explanation as to why the decoding is needed is provided at user-profile.js
}