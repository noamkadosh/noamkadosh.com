module.exports = (error, req, res, next) => {
    console.log(error);
    res.status(error.status).json(error);
};