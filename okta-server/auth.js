const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://.oktapreview.com/oauth2/default',
  clientId: ''
});

function oktaAuth(req, res, next) {
  if (!req.token) {
    return res.status(403).send({ auth: false, message: 'No token provided' });
  }

  oktaJwtVerifier.verifyAccessToken(req.token).then(function(jwt) {
    req.userId = jwt.claims.uid;
    req.userEmail = jwt.claims.sub;
    next();
  }, function(err) {
    return res.status(500).send({ auth: false, message: 'Could not authenticate token' });
  });
}

module.exports = oktaAuth;
