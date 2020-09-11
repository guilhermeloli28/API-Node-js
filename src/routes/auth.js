const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const secret = 'Segredo!';
const ValidationError = require('../errors/ValidationError')

module.exports = (app) => {

    const signin = (req, res, next) => {
        app.services.users.findOne( {email: req.body.email} )
        .then((user) => {
            if(!user) throw new ValidationError('Usuário ou senha incorreta');
            
            if(bcrypt.compareSync(req.body.password, user.password)) {
                const payLoad = {
                    id: user.Id,
                    name: user.name,
                    email: user.email
                };

                const token = jwt.encode(payLoad, secret);

                res.status(200).json({ token });
            } else throw new ValidationError('Usuário ou senha incorreta');
        }).catch(err => next(err));
    }

    return { signin };
};