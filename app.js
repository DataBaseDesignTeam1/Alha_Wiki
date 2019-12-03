// const express = require('express');
import express from "express";
import morgan from "morgan"; // for logging
import helmet from "helmet"; // for security
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import globalRouter from "./routers/globalRouter";

import routes from "./routes";
// // middleware 로그 남기고 싶은 곳에 어디든
// const between = (req, res, next) => {
//     console.log(`between`);
//     next();
// }
// // 어떤 링크던 middleware 실행 됨 logging, 접속 취소, IP확인, Login확인 같은 용도 사용 가능
// app.use(between);

// const middleware = (req, res, next) => {
//     // middleware가 res.send를 호출하면 연결을 끊을 수 있음, next대신
//     res.send("not happening");
    
// }
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.use(express.static('views'));

app.engine('html', require(`ejs`).renderFile);
app.set(`view engine`, `html`);



app.use(routes.main, globalRouter);


// app.use("/user", userRouter);
// app.use("/video", videoRouter);


export default app;