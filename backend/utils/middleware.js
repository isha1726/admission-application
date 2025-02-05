const logger = require("./logger")

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    // Id is not matched
    if (error.name === "CastError") {
        return res.status(400).send({ error: "malformatted id" })
    }
    //Vlidation error
    else if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message })
    }

    next(error)
}

module.exports = {
    unknownEndpoint,
    errorHandler,
}
