const About = require('../models/about');

exports.getAbout = (req, res, next) => {
    About.find()
        .then(about => {
            res.status(200).json(about);
        })
        .catch(err => {
            const error =  new Error(err);
            error.status = 401;
            error.msg = 'Unknown error occured.';
            return next(error);
        });
};

exports.postAbout = (req, res, next) => {
    const about = new About();
    about.text = req.body.text;
    about.bold_text = req.body.bold_text;
    about.save()
        .then(() => {
            res.status(201).json({
              msg: 'About added successfully.',
                _id: settings._id
            });
        })
        .catch(err => {
            const error =  new Error(err);
            error.status = 401;
            error.msg = 'Unknown error occured.';
            return next(error);
        });
};

exports.putAbout = (req, res, next) => {
    const about = {
        text: req.body.text,
        bold_text: req.body.bold_text
    };
    About.updateOne({
            _id: req.body._id
        }, about)
        .then(result => {
            res.status(200).json({
              msg: 'About updated successfully.',
                result: result
            });
        })
        .catch(err => {
            const error =  new Error(err);
            error.status = 401;
            error.msg = 'Unknown error occured.';
            return next(error);
        });
};
