const express = require("express");
const app = express();
const port = 8000;

const scheduleRoutes = require('./routes/schedule-route');
app.use('/schedule', scheduleRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
