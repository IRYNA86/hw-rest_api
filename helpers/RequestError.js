const RequestError = (status, message) => {
    const error = new Error('Not found');
    error.status = 404;
    return error
}

module.exports = RequestError;