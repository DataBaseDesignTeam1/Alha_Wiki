import express from "express";
import routes from "../routes";
import { main, login, logout, signup, in_big_category, select_business, post_alba_wiki, get_alba_wiki, post_write_review, post_enroll_member } from "../controllers/globalController";
import { connection } from "../db";

const globalRouter = express.Router();


globalRouter.get(routes.login, login);

globalRouter.get(routes.logout, logout);

globalRouter.get(routes.signup, signup);


globalRouter.post(routes.enroll_member, post_enroll_member);


globalRouter.get(routes.recommand, (req, res, next) => {
    var user_index = req.params.user_index;

    console.log({user_index : user_index});

    res.send(`RECOMMAND_ALBA`);
});


globalRouter.get(routes.albawiki, get_alba_wiki);

globalRouter.post(routes.write_review, post_write_review);

globalRouter.get(routes.select_business, select_business);

globalRouter.get(routes.in_big_category, in_big_category);

globalRouter.get(routes.main, main);



export default globalRouter;