const { badRequestExeption } = require('../middlewares/errHandler');
const authRoutes = require('./auth_routes')
const userRoutes = require('./user_routes')
const insertRoute = require('./insert')
const propertyType = require('./propertyType')

const initRoutes = (app) => {

    app.use('/api/auth', authRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/insert', insertRoute);
    app.use('/api/property-type', propertyType);

    app.use(badRequestExeption)

}

module.exports = initRoutes;