const express = require("express");
const auth = require("./middleware/auth");
const usersRouter = require("./routes/user");
const middlewares = require("./middleware/inde");
const morganMiddleware = require("./config/morganMiddleware");
const Logger = require("./config/logger");
const app = express();

app.use(express.json());
app.use(morganMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/users", usersRouter);

app.use((err, req, res, next) => {
  console.log(err);
  Logger.error(err.message);
  res.status(err.statusCode || 500).json({ message: err.message });
});

app.use("*", middlewares.notFound);

const PORT = process.env.APP_PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
