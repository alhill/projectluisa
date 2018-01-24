const AuthenticationController = require('./controllers/authentication'),
		ProtectedController = require('./controllers/protected'),
    express = require('express'),
    passportService = require('./config/passport'),
    passport = require('passport');

//Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { sessions: false });

//Constants for role types
const REQUIRE_ADMIN = 'Admin',
    REQUIRE_OWNER = 'Owner',
    REQUIRE_CLIENT = 'Client',
    REQUIRE_MEMBER = 'Member';

module.exports = function(app) {
    //Initializing route groups
    const apiRouter = express.Router(),
        authRoutes = express.Router();

    //Auth routes
    //===========
    //Set auth routes as subgroup/middleware to apiRoutes
    apiRouter.use('/auth', authRoutes);

    //Registration route
    authRoutes.post('/register', AuthenticationController.register);

    //Login route
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
	
	authRoutes.get('/currentuser', AuthenticationController.currentuser);
    
    //Set url for API group routes
    app.use('/api', apiRouter);
		
};