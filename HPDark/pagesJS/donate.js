if(new URLSearchParams(location.search).get('username') != null) {
    document.getElementsByName("username")[0].value = unescape(new URLSearchParams(location.search).get('username')); // Explanation as to why the decoding is needed is provided at user-profile.js
}