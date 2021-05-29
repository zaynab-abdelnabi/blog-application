const createHttpError = require('http-errors');
const User = require('../models/user');
const createError = require('http-errors');

exports.create = (req, res, next) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
        .then(user => {
            res.json(user);
        })
        .catch(next);
};

exports.list = (req, res, next) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(next);
};

exports.show = (req, res, next) => {
    User.findOne(req.params.id)
        .then(users => {
            res.json(users);
        })
        .catch(next);
};

exports.update = (req, res, next) => {
    let data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    User.findByIdAndUpdate(req.params.id, data)
        .then(UpdatedUser => {
            if (!UpdatedUser) throw createError(404,"user not found");
            res.json(UpdatedUser);
        })
        .catch(next);
};

exports.delete = (req, res, next) => {
    User.findOneAndRemove(req.params.id)
        .then(deleted => {
            if (!deleted) throw createError(404, "user not found");
            res.json({ message: "user deleted" });
        })
        .catch(next);
};