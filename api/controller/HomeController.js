exports.home = function (req, res) {    
    res.json({
        status: "success",
        message: "Home retrieved successfully",
       // data: contacts
    });
};