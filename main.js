const clientID = 'newfims-490001e0fab42ea0c747314ad3b97f77327513932967352894'
const oauth2BaseURL = 'https://api.kroger.com/v1/connect/oauth2'
const apiBaseURL = 'https://api.kroger.com'
const redirectURL = 'https://fimshub.github.io/cb.html'

let authToken = null;
let refToken = null;

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
      if (refToken == "null") {
        console.log('redirecting to login');
        redirectToLogin();
      }
    });
  });
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