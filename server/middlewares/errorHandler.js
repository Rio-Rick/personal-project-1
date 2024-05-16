const errorHandler = (err, req, res, next) => {
    let status = 500
    let message = "Internal Server Error"

    if (err.name === 'LoginError') {
        status = 401
        message = 'Username/Password salah'
    }

    if (err.name == 'Unauthorized') {
        status = 401
        message = "Unauthorized"
    }

    if (err.name == 'JsonWebTokenError') {
        status = 401
        message = 'Unauthorized'
    }

    if (err.name == "NotFound") {
        status = 404
        message = "Not Found"
    }

    if(err.name === "SequelizeValidationError") {
        status = 400
        message = err.errors[0].message
    } 

    if(err.name === "SequelizeUniqueConstraintError") {
        status = 400
        message = "email already taken"
    }

    if(err.name === "LoginError") {
        status = 401
        message = "Invalid Email / Password"
    }
    
    if(err.name === "Forbidden"){
        status = 403
        message = "Forbidden"
    }

    if(err.name === "SequelizeDatabaseError") {
        status = 400
        message = "Invalid Data Type"
    }

    if(err.name === "ForeignKeyConstraintError") {
        status = 400
        message = "Foreign key error"
    }

    if(err.name === "EmailLoginError") {
        status = 400
        message = "Email Can't be empty"
    }
    if(err.name === "PasswordLoginError") {
        status = 400
        message = "Password Can't be empty"
    }

    res.status(status).json({
        message
    })

}

module.exports = errorHandler