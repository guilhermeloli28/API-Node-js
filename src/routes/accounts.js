module.exports = (app) => {
    const getById = (req, res) => {
        app.services.accounts.findById({id: req.params.id})
            .then((result) => {
                if(!result) {
                    return res.status(400).json(`Conta de id ${req.params.id} não encontrado!`)
                }

                return res.status(200).json(result);
            })
    }

    const getAll = (req, res) => {
        app.services.accounts.findAll()
            .then(result => res.status(200).json(result));
    }

    const create = (req, res, next) => {
        app.services.accounts.save(req.body)
            .then((result) => {
                return res.status(201).json(result[0]);
            })
            .catch(err => next(err));
    }

    const update = (req, res) => {
        app.services.accounts.update(req.params.id, req.body)
            .then(result => res.status(200).json(result[0]));
    }

    const deleteAccounts = (req, res) => {
        app.services.accounts.deleteAccounts(req.params.id)
            .then(() => res.status(204).send());
    }

    return { create, getAll, getById, update, deleteAccounts };
};