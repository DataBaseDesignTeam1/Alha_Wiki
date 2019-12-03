import express from "express";

export const userRouter = express.Router();

userRouter.get("/", (req, res) => res.send(`user index`));
userRouter.get("/edit", (req, res) => res.send(`user edit`));
userRouter.get("/password", (req, res) => res.send(`user password`));



// Global
const MAIN = "/";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SIGNUP = "/signup";

const RECOMMANDALBA = "/recommand_alba";

const SELECTBUSINESS = "/category/:bigc_id/:smallc_id/:business_id";
const ALBA_WIKI = "/category/:bigc_id/:smallc_id"
const BIG_CATEGORY = "/category/:bigc_id"


const routes = {
    main: MAIN,
    login: LOGIN,
    logout: LOGOUT,
    signup: SIGNUP,
    recommand_alba: RECOMMANDALBA,

    select_business: SELECTBUSINESS,
    albawiki: ALBA_WIKI,
    in_big_category: BIG_CATEGORY
};

export default routes;