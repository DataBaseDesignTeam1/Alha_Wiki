import express from "express";
import routes from "../routes";
import { main, login, signup, in_big_category, select_business, get_alba_wiki, post_write_review, post_enroll_member, post_update_tip, get_select_business, post_select_business } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get(routes.login, login);

globalRouter.get(routes.signup, signup);

globalRouter.get(routes.recommand, (req, res, next) => {
    var user_index = req.params.user_index;

    console.log({user_index : user_index});

    res.send(`RECOMMAND_ALBA`);
});

globalRouter.get(routes.albawiki, get_alba_wiki);

globalRouter.get(routes.select_business, get_select_business);
globalRouter.post(routes.select_business, post_select_business);

globalRouter.get(routes.in_big_category, in_big_category);

globalRouter.get(routes.main, main);

globalRouter.post(routes.enroll_member, post_enroll_member);

globalRouter.post(routes.write_review, post_write_review);

globalRouter.post(routes.update_tip, post_update_tip);

export default globalRouter;