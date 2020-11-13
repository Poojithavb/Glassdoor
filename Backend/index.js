const app = require('./app');

const images = require('./Student/routes/images')


app.use("/images", images)

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;