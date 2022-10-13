class HttpError extends Error{
    constructor(message, errorCode){
        super(message); //Add a message you want show to user
        this,code = errorCode; //Add error code you prefer such as 401, 403, 500
    }
}

module.exports = HttpError;