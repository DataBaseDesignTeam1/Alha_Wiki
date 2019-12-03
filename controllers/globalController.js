export const main = (req, res, next) => {
    // console.log(req.params);    
    res.render(`Main.html`);
}

export const login = (req, res, next) => {
    res.render(`login.html`);
}

export const logout = (req, res, next) => {
     res.send(`LOGOUT`);
}

export const signup = (req, res, next) => {
    res.render(`SignUp.html`);
}