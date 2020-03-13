const express = require('express');
const fallback = require('express-history-api-fallback');
const config = require('./src/config.js');
const logger = require('./src/logger.js');
let cors = require('cors')

const app = express();
app.use(cors())
app.enable('trust proxy');
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, PUT, PATCH, DELETE");
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
app.use(logger.log4js.connectLogger(logger.getLogger('express'), {level: 'auto'}));
const root = __dirname + config.app.front_path;
app.use(express.static(root));

if (process.env.PORT)
  config.app.port = process.env.PORT;
app.listen(config.app.port, function () {
  logger.info(`${config.app.name} listening on port ${config.app.port}!`);
});

Promise.resolve()
  .then(() => {
    app.use('/api', require('./api/index.js'));
    logger.info('REST API attached to `/api` route');
    app.use(fallback('/public/index.html', { root }));
  })
  .catch(err => {
    logger.fatal(err.message);
    logger.error(err);
    db().close();
    process.exit(1);
  })
