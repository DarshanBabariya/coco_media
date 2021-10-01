const logoutController = (req,res) => {
    res.cookie('jwtUser','',{ maxAge: 1 });
    res.redirect('/');
}

module.exports = logoutController ;