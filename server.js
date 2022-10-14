const express = require("express");
const app = express();
const port = 8000;
require("dotenv").config();

const scheduleRoutes = require("./routes/schedule-route");
app.use("/schedule", scheduleRoutes);

const showDay = require("./routes/days-routes");
app.use("/day", showDay);

app.listen(port, () => console.log(`Server is running on port ${port}`));
