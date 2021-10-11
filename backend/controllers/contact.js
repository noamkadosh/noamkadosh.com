const Contact = require('../models/contact');

exports.getContact = (req, res, next) => {
    Contact.find()
        .then(contact => {
            res.status(200).json(contact);
        })
        .catch(err => {
            const error =  new Error(err);
            error.status = 401;
            error.msg = 'Unknown error occured.';
            return next(error);
        });
};

exports.postContact = (req, res, next) => {
    const contact = new Contact();
    contact.contact_title = req.body.contact_title;
    contact.contact_text = req.body.contact_text;
    contact.save()
        .then(() => {
            res.status(201).json({
              msg: 'Contact added successfully.',
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

exports.putContact = (req, res, next) => {
    const contact = {
        contact_title: req.body.contact_title,
        contact_text: req.body.contact_text
    };
    Contact.updateOne({
            _id: req.body._id
        }, contact)
        .then(result => {
            res.status(200).json({
              msg: 'Contact updated successfully.',
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
