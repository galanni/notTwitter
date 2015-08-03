$(document).ready(function() {
  var lastResponse = 0;
  var dialog = document.getElementById('dialog');
  var ingresarBtn = $('#ingresarBtn');
  var tweetBtn = $('#tweetBtn');
  var tweetContent = $('#tweetContent');
  var userInput = $('#userInput');
  var contenedorDeTweets = $('#contenedor .centre');
  var userName;

  dialog.showModal();

  // modal inicial
  ingresarBtn.on('click', function() {
    dialog.close();
    userName = userInput.val();
    $('#userName').text(userName);
  });

  // si el usuario apreta enter en el modal cuenta cómo click
  userInput.keyup(function(event) {
    if (event.keyCode == 13) {
      ingresarBtn.click();
    }
  });

  // si el usuario apreta enter en el input del tweet, lo tweetea
  tweetContent.keyup(function(event) {
    if (event.keyCode == 13) {
      tweetBtn.click();
    }
  });

  tweetBtn.on('click', function() {
    // hacer post a /tweet con el formato
    // {
    //     text:'el contenido del input tweetContent'
    // }

    $.ajax({
      type: 'POST',
      url: '/tweet',
      data: JSON.stringify({
        text: tweetContent.val()
      }),
      dataType: 'json',
      headers: {
        user: userName,
        timestamp: Date.now()
      },
      success: function() {
        console.log('La solicitud fué completada con éxito.');
      },
      error: function(res) {
        console.log('Ocurrió un error al realizar la solicitud.' +
          ' El texto que respondió el server fué:"' + res.responseText + '"');
      }
    });
  });

  // Cada X cantidad de segundos, hacer un GET a /data
  // Por cada elemento de la lista que responda el servidor,
  // agregarlo haciendo $('#contenedor .centre').append(htmlDelTweet)
  // HINT: usar la function getHTMLforTweet
  setInterval(function() {
    $.ajax({
      type: 'GET',
      url: '/data',
      headers: {
        user: userName,
        timestamp: lastResponse
      },
      success: function(data) {
        data.forEach(function(tweetObj) {
          contenedorDeTweets.append(getHTMLforTweet(tweetObj));
        });
        lastResponse = Date.now();
      },
      error: function() {
        console.log('Ocurrió un error al solicitar la data.' +
          ' Fijate que el servidor esté escribiendo y terminando el objeto "response"');
      }
    });
  }, 3000);

  // función que recibe un objeto que represente a un tweet
  // y devuelve un elemento html que represente a ese tweet
  function getHTMLforTweet(tweet) {
    var elemHTML = $('<div></div>');
    elemHTML.html('<span>User:' + tweet.user.name +
      '</span><p>' + tweet.text + '</p>');
    return elemHTML;
  }
});