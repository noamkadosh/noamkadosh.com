const TimelineItem = require('../models/timeline-item');

exports.getItems = (req, res, next) => {
    TimelineItem.find()
        .then(item => {
            res.status(200).json(item);
        })
        .catch(err => {
            const error =  new Error(err);
            error.status = 401;
            error.message = 'Unknown error occured.';
            return next(error);
        });
};

exports.postItem = (req, res, next) => {
    const item = new TimelineItem();
    item.role = req.body.role;
    item.company = req.body.company;
    item.description = req.body.description;
    item.link = req.body.link;
    item.badge = req.body.badge;
    item.year = req.body.year;
    item.save()
        .then(() => {
            res.status(201).json({
                message: 'Item added successfully.',
                _id: item._id
            });
        })
        .catch(err => {
            const error =  new Error(err);
            error.status = 401;
            error.message = 'Unknown error occured.';
            return next(error);
        });
};

exports.putItem = (req, res, next) => {
    const item = {
        role: req.body.role,
        company: req.body.company,
        description: req.body.description,
        link: req.body.link,
        badge: req.body.badge,
        year: req.body.year
    };
    TimelineItem.updateOne({
            _id: req.body._id
        }, item)
        .then(result => {
            res.status(200).json({
                message: 'Item updated successfully.',
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

exports.deleteItem = (req, res, next) => {
    TimelineItem.deleteOne({
            _id: req.params.id
        })
        .then(result => {
            res.status(200).json({
                message: 'Item deleted successfully.',
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