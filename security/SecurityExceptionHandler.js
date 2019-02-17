async function accessDenied(res){
    return res.status(403).json({
        success: false,
        message: "Access Denied"
    });
}//end sendAccessDenied

module.exports={
    accessDenied
}
