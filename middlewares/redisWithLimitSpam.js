const redis = require('../config/redis.config');

const redisLimitSpam = async (req, res, next) => {

    const clientId = req.headers?.client_id;

    const currentTime = Date.now();

    const client = await redis.hGetAll(`redisLimitSpam-${clientId}`);

    // console.log('client : ', client);


    // call yet
    if (+Object.keys(client)?.length === 0) { 
        await redis.hSet(`redisLimitSpam-${clientId}`, 'createAt', currentTime);
        await redis.hSet(`redisLimitSpam-${clientId}`, 'countSpam', 1);
        return next();
    }


    // called
    let difference = (currentTime - +client.createAt) / 1000;
    if (difference >= + process.env.LIMIT_TIME_SPAM) {
        await redis.hSet(`redisLimitSpam-${clientId}`, 'createAt', currentTime);
        await redis.hSet(`redisLimitSpam-${clientId}`, 'countSpam', 1);
        return next();
    }
    else {
        if (client.countSpam > +process.env.LIMIT_COUNT_SPAM) {
            return res.status(429).json({
                statusCode: 429,
                success: false,
                message: 'Please... do not spam api !!!'
            })
        }
        await redis.hSet(`redisLimitSpam-${clientId}`, 'countSpam', +client.countSpam + 1);
        return next();
    }

}

module.exports = redisLimitSpam;