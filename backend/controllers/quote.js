const Quote = require('../models/quote');

exports.getQuote = (req, res, next) => {
    Quote.find()
        .then(quote => {
            res.status(200).json(quote);
        })
        .catch(err => {
            const error =  new Error(err);
            error.status = 401;
            error.message = 'Unknown error occured.';
            return next(error);
        });
};

exports.postQuote = (req, res, next) => {
    const quote = new Quote();
    quote.quote = req.body.quote;
    quote.author = req.body.author;
    quote.save()
        .then(() => {
            res.status(201).json({
                message: 'Quote added successfully.',
                _id: quote._id
            });
        })
        .catch(err => {
            const error =  new Error(err);
            error.status = 401;
            error.message = 'Unknown error occured.';
            return next(error);
        });
};

exports.putQuote = (req, res, next) => {
    const quote = {
        quote: req.body.quote,
        author: req.body.author
    };
    Quote.updateOne({
            _id: req.body._id
        })
        .then(result => {
            res.status(200).json({
                message: 'Quote updated successfully.',
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