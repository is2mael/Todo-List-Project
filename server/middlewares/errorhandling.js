function errorHandler(err, req, res, next) {
    console.log(err, "<<<<< error hanler")

    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            res.status(400).json({ message: err.errors[0].message });
            return;
        case "NotFound":
            res.status(404).json({ message: err.message });
            return
        case "BadRequest":
            res.status(400).json({ message: err.message });
        default:
            res.status(500).json({ message: "Internal Server Error" });
            break;
    }
}

module.exports = errorHandler;