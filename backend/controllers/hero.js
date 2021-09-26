const Hero = require('../models/hero');

exports.getHero = (req, res, next) => {
    Hero.find()
        .then(hero => {
            res.status(200).json(hero);
        })
        .catch(err => {
            const error =  new Error(err);
            error.status = 401;
            error.message = 'Unknown error occured.';
            return next(error);
        });
};

exports.postHero = (req, res, next) => {
    const hero = new Hero();
    hero.title = req.body.title;
    hero.subtitle = req.body.subtitle;
    hero.save().then(() => {
            res.status(201).json({
                message: 'Hero added successfully.',
                _id: hero._id
            });

        })
        .catch(err => {
            const error =  new Error(err);
            error.status = 401;
            error.message = 'Unknown error occured.';
            return next(error);
        });
};

exports.putHero = (req, res, next) => {
    const hero = {
        title: req.body.title,
        subtitle: req.body.subtitle
    };
    Hero.updateOne({
            _id: req.body._id
        }, hero)
        .then(result => {
            res.status(200).json({
                message: 'Hero updated successfully.',
                result: result
            });
        })
        .catch(err => {
            const error =  new Error(err);
            error.status = 401;
            error.message = 'Unknown error occured.';
            return next(error);
        });
};