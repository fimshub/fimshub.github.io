const clientID = 'fims-062a4c23a50918e9f3cbc208a42e08647653895110161406010'
const clientSecret = 'nbJ3NUYbQTkyuEagbl5oHe7j85FGlopLur4hrHCr'
const oauth2BaseURL = 'https://api.kroger.com/v1/connect/oauth2'
const apiBaseURL = 'https://api.kroger.com'
const redirectURL = 'https://fimshub.github.io/cb.html'

let authToken = null;
let refToken = null;

function setup() {
  setToken();
  setInterval(setToken, 1200000)
}

function draw() {

}

function setToken() {
  const send = {};
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(send)
  };
  fetch('https://fimsbackend.azurewebsites.net/getAuthToken', payload).then(response => {
    response.json().then(data => {
      authToken = data.authToken;
      refToken = data.refToken;
    });
  });
  if (refToken == null) {
    redirectToLogin();
  }
}

function redirectToLogin() {
  const scope = encodeURIComponent('cart.basic:write product.compact');
  const url =
    `${oauth2BaseURL}/authorize?` +
    `client_id=${encodeURIComponent(clientID)}` +
    `&redirect_uri=${encodeURIComponent(redirectURL)}` +
    `&response_type=code` +
    `&scope=${scope}`;
  window.location = url;
}