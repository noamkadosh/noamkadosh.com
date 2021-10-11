const Skill = require('../models/skill');

exports.getSkills = (req, res, next) => {
    Skill.find()
        .then(skills => {
            res.status(200).json(skills);
        })
        .catch(err => {
            const error =  new Error(err);
            error.status = 401;
            error.msg = 'Unknown error occured.';
            return next(error);
        });
};

exports.postSkill = (req, res, next) => {
    if (req.body.name === '' || req.body.rating === null) {
        return res.status(204).json();
    }
    const skill = new Skill();
    skill.name = req.body.name;
    skill.rating = req.body.rating;
    skill.save()
        .then(() => {
            res.status(201).json({
              msg: 'Skill added successfully.',
                _id: skill._id
            });
        })
        .catch(err => {
            const error =  new Error(err);
            error.status = 401;
            error.msg = 'Unknown error occured.';
            return next(error);
        });
};

exports.putSkill = (req, res, next) => {
    const skill = {
        name: req.body.name,
        rating: req.body.rating
    };
    Skill.updateOne({
            _id: req.body._id
        }, skill)
        .then(result => {
            res.status(200).json({
              msg: 'Skill updated successfully.',
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

exports.deleteSkill = (req, res, next) => {
    Skill.deleteOne({
            _id: req.params.id
        })
        .then(result => {
            res.status(200).json({
              msg: 'Skill deleted successfully.',
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
