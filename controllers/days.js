const showDay = (req, res) => {
  res.render("");
};

// make a request to the database
// receive the days back + number appointments + number interviews for each day
// calculate how many spots we have available for each day
// return that to the client
// example of the return in mocks - days.json

module.exports = { showDay };
