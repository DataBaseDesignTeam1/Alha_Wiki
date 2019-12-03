import express from "express";
import routes from "../routes";
import { main, login, logout, signup } from "../controllers/globalController";

const globalRouter = express.Router();


globalRouter.get(routes.login, login);

globalRouter.get(routes.logout, logout);

globalRouter.get(routes.signup, signup);


globalRouter.get(routes.recommand_alba, (req, res, next) => {
    res.send(`RECOMMAND_ALBA`);
});


globalRouter.get(routes.select_business, (req, res, next) => {
    var bigCategory = req.params.bigc_id;
    var smallCategory = req.params.smallc_id;
    var businessID = req.params.business_id;

    // console.log({bigCategory : bigCategory});
    // console.log({smallCategory : smallCategory});
    // console.log({businessID : businessID});

    res.send(`SELECT_BUSINESS`);
});


globalRouter.get(routes.albawiki, (req, res, next) => {
    var bigCategory = req.params.bigc_id;
    var smallCategory = req.params.smallc_id;
    
    // console.log({bigCategory : bigCategory});
    // console.log({smallCategory : smallCategory});

    res.send('big & small Category');
});

globalRouter.get(routes.in_big_category, (req, res, next) => {
    var bigCategory = req.params.bigc_id;

    console.log(`bigCategory : ${bigCategory}`);

    res.send('bigCategory');
});



globalRouter.get(routes.main, main);
export default globalRouter;