const checkReferer = (req, res, next) => {
    const referer = req.get('Referer');
    const origin = req.get('Origin');

    const allowedOrigin = 'https://register.stocktutor.com/registration' ;

    if (referer && referer.startsWith(allowedOrigin) || origin && origin === allowedOrigin) {
        return next();
    }

    return res.status(403).json({
        message: 'Forbidden: Requests are only allowed from https://register.stocktutor.com/registration'
    });
};

export default checkReferer;
