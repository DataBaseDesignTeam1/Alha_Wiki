import express from "express";
import routes from "../routes";
import { main, in_big_category, get_alba_wiki, post_write_review, post_enroll_member, post_update_tip, get_select_business, post_select_business, get_signup, post_signup, get_login, post_login, post_recommand, get_recommand } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get(routes.login, get_login);
globalRouter.post(routes.login, post_login);

globalRouter.get(routes.signup, get_signup);
globalRouter.post(routes.signup, post_signup);

globalRouter.get(routes.recommand, get_recommand);
globalRouter.post(routes.recommand, post_recommand);

globalRouter.get(routes.albawiki, get_alba_wiki);

globalRouter.get(routes.select_business, get_select_business);
globalRouter.post(routes.select_business, post_select_business);

globalRouter.get(routes.in_big_category, in_big_category);

globalRouter.get(routes.main, main);

globalRouter.post(routes.enroll_member, post_enroll_member);

globalRouter.post(routes.write_review, post_write_review);

globalRouter.post(routes.update_tip, post_update_tip);

export default globalRouter;