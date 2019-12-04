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

const RECOMMAND = "/recommand/:user_index";

const ENROLL_MEMBER = "/enroll_member";
const WRITE_REVIEW = "/write_review";
const UPDATE_TIP = "/update_tip";

const BIG_CATEGORY = "/category/:bigc_id";
const SELECTBUSINESS = "/category/:bigc_id/:smallc_id";
const ALBA_WIKI = "/category/:bigc_id/:smallc_id/:business_id";

const routes = {
    main: MAIN,
    login: LOGIN,
    logout: LOGOUT,
    signup: SIGNUP,
    recommand: RECOMMAND,

    write_review: WRITE_REVIEW,
    enroll_member: ENROLL_MEMBER,
    update_tip: UPDATE_TIP,

    in_big_category: BIG_CATEGORY,
    select_business: SELECTBUSINESS,
    albawiki: ALBA_WIKI
};

export default routes;