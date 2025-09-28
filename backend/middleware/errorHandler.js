

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Default to 500 if not set
    const status = err.status || 500;

    res.status(status).json( err.message || { message: "Internal Server Error" } );
}

module.exports = errorHandler;