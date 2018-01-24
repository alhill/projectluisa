// keys.js - figure out what set of credentials to return (dev or prod)

if (process.env.NODE_ENV === 'production'){
	//We are in production, return the production set of keys
	module.exports = require('./main_prod');
}
else{
	//We are in development, return the dev keys!
	module.exports = require('./main');
}