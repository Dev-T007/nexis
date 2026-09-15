import express from "express";
import cookie_Parser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN,"http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json({
    limit:'10mb'
}));

app.use(express.urlencoded({
    extended: true, 
    limit:'10mb'}));

app.use(mongoSanitize());
app.use(hpp()); 

app.use(express.static('public'));

app.use(cookie_Parser());

import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import commentRouter from "./routes/comment.routes.js";
import likeRouter from "./routes/like.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import saveRouter from "./routes/save.routes.js";
import noteRouter from "./routes/note.routes.js";
import homeRouter from "./routes/home.routes.js";

app.use("/api/v1/home", homeRouter);
app.use("/api/v1", healthcheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/playlists", playlistRouter);
app.use("/api/v1/saves", saveRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/notes", noteRouter)

import { errorHandler } from "./middlewares/error.middleware.js";

app.use(errorHandler);

export { app };
