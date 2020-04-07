const clientID = 'fims-062a4c23a50918e9f3cbc208a42e08647653895110161406010'
const clientSecret = 'nbJ3NUYbQTkyuEagbl5oHe7j85FGlopLur4hrHCr'
const oauth2BaseURL = 'https://api.kroger.com/v1/connect/oauth2'
const apiBaseURL = 'https://api.kroger.com'
const redirectURL = 'https://fimshub.github.io'

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