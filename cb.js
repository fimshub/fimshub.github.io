function setup() {

}

function draw() {

}

async function getToken() {
  var url = document.createElement('a');
  url.href = window.location.href;
  let authCode = url.search.split('=')[1];
  const code = {
    authCode
  };
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(code)
  };
  const response = await fetch('https://fimsbackend.azurewebsites.net/incomingAuthCode', payload);
  const data = await response.json();
}