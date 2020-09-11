const ValidationError = require('../errors/ValidationError')
const bcrypt = require('bcrypt-nodejs');

module.exports = (app) => {
    const findAll = (filter = {}) => {
        return app.db('users').where(filter).select(['Id', 'name', 'email']);
    }

    const findOne = (filter = {}) => {
        return app.db('users').where(filter).first();
    }

    const getPasswordHash = (password) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    const save = async (user) => {
        if(!user.name)  throw new ValidationError('Nome é uma propriedade obrigatória.');
        if(!user.email)  throw new ValidationError('Email é uma propriedade obrigatória.');
        if(!user.password)  throw new ValidationError('Senha é uma propriedade obrigatória');

        const userDb = await findOne({email: user.email});

        if(userDb) return { error: 'Email já existe' };

        const newUser = { ...user};
        newUser.password = getPasswordHash(newUser.password);

        return app.db('users').insert(newUser, ['Id', 'name', 'email']);
        
    }

    const deleteAll = () => {
        return app.db('users').del();
    }

    return { findAll, save, findOne , deleteAll};
};