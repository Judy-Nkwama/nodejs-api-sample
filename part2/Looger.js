const Log = (req, res, next) => {
    console.log("logging in progress....");
    next();
}

module.exports = Log;