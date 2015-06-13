$(document).ready(function() {
    var lastTime = 0;
    var dialog = document.getElementById('dialog');
    dialog.showModal();

    $('#ingresarBtn').on('click', function() {
        dialog.close();
        $('#userName').text($('#userInput').val());
    });

    $('#tweet').on('click', function() {
        // hacer POST a /tweet
    });

    // Cada X cantidad de segundos, hacer un GET a /data
    // Por cada elemento de la lista que responda el servidor,
    // agregarlo haciendo $('#contenedor .centre').append(htmlDelTweet)
    // HINT: usar la function getHTMLforTweet, que recibe un objeto que representa
    // un tweet y devuelve un objeto que representa su HTML

    function getHTMLforTweet(tweet) {
        var elemHTML = $('<div></div>');
        elemHTML.html('User:' + tweet.user.name +
            '<br>' + tweet.text);
        return elemHTML;
    }
});