# notTwitter
Aplicación web con un enfoque práctico hecha con Node.js similar a reconocida red social en la cual se utilizan conceptos del protocolo HTTP, módulos y AJAX.

## Inicialización

Para poder ejecutar la aplicación, previamente deberías ejecutar en tu terminal

```
npm install
```
Si tenés problemas ejecutando el comando previo, te sugiero que leas el [documento](https://gist.github.com/a0viedo/39b4db96ebb9a6d16f35) sobre módulos.

Una vez instaladas las dependencias, deberías poder iniciar la aplicación ejecutando:
```
node index.js
```

Deberías ahora poder acceder a la URL [http://localhost:8000](http://localhost:8000) en tu navegador y ver lo siguiente:
![landing](http://imgur.com/I8d2CYW.png)

Si querés cambiar el puerto dónde escucha tu servidor, podrías ejecutar `node index.js --port 3333` cambiando el número de puerto por el de tu preferencia.

## Funcionalidades a agregar
La aplicación sirve el contenido estático del directorio `public` y en el lado del cliente utiliza jQuery para realizar solicitudes AJAX. El servidor posee dos routas: **una para solicitar tweets** y **otra para enviar tweets**.

### Solicitando tweets
El cliente deberá realizar una solicitud a la URL `/data` indicando el user y timestamp correspondientes en los headers de la solicitud. El campo user será el que el usuario ingresó en el input inicial al abrir el sitio y el campo timestamp deberá ser la última vez que se obtuvo una respuesta de los tweets del servidor. Es decir, algo parecido a:
```js
$.ajax({
  type: 'GET',
  url: '/data',
  headers: {
    user: 'user1',
    timestamp: 1
  },
  success: function(data) {
    // data es la lista de tweets
  },
  error: function(){
    // hubo un error
  }
});
```

El servidor recibirá esta solicitud y deberá responder una lista de tweets en formato JSON.

### Enviando tweets

Desde el lado del cliente se deberá hacer una solicitud POST a la URL `/tweet` para enviar un tweet. Se deberá enviar el contenido del tweet en el *body* y los campos user y timestamp en los headers de la solicitud. El campo user será el mismo que se utiliza al [solicitar tweets](#solicitando-tweets) y en el campo timestamp se deberá enviar el valor del tiempo actual (`Date.now()`).
El formato de un tweet genérico sería:
```
{
  "text": "el texto a tweetear"
}
```
Entonces, la solicitud sería bastante parecida al siguiente ejemplo:
```js
$.ajax({
  type: 'POST',
  url: '/tweet',
  data: JSON.stringify({ text: 'reemplazar por el contenido del input'}),
  dataType: 'json',
  headers: {
    timestamp: 1,
    user: : 'user1'
  },
  success: function() {
    // el servidor respondió correctamente
  },
  error: function(){
    // hubo un error
  }
});
```
