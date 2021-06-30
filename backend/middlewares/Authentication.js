const jwt = require('jsonwebtoken')
const {error} = require('../network/response')

module.exports = (credentials=[]) => {
    return (req, res, next) => {
        if (typeof credentials === "string") credentials = [credentials];
        const token = req.headers["authorization"];
        if (!token) return error(req, res , 'Acceso denegado', 401, 'Error token');
        const tokenBody = token.split(' ')[1];
        jwt.verify(tokenBody, process.env.BCRYPT_PASSWORD, (err, decoded)=>{
            if (err) return error(req, res, 'Acceso denegado', 401, 'Error en jwt.veryfy');
            req.id = decoded.id
            if (credentials.length > 0) {
                if (decoded.scopes && decoded.scopes.length && credentials.some(cred => decoded.scopes.indexOf(cred) >= 0)) {
                    next();
                } else {
                    return error(req, res, 'Acceso denegado', 401, 'Error en validación de crednciales')
                }
            } else {
                next();
            }
        })
    }
}
