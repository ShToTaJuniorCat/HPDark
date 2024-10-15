// Yes, this code is ugly. Very ugly. I know, I feel you. But, if you have a tested idea of how to make it 
// better, more efficient, prettier or anything like that - please reach out to me.
const username = new URLSearchParams(location.search).get('username');
if (username !== null) {
    $('[name="username"]').val(unescape(username));
}
