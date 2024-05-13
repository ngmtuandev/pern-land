const { badRequestExeption } = require('../middlewares/errHandler');
const authRoutes = require('./auth_routes')
const userRoutes = require('./user_routes')

const initRoutes = (app) => {

    app.use('/api/auth', authRoutes);
    app.use('/api/user', userRoutes);

    app.use(badRequestExeption)

}

module.exports = initRoutes;