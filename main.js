const Express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

const jwt = require('./config/jwt.config');

require('dotenv').config();

const authRouter = require('./modules/auth/auth.router');
const userRouter = require('./modules/user/user.router');
const beritaRouter = require('./modules/berita/berita.router');
const bankRouter = require('./modules/bank/bank.router');
const bannerRouter = require('./modules/banner/banner.router');
const ktaRouter = require('./modules/kta/kta.router');
const kprRouter = require('./modules/kpr/kpr.router');
const server = new Express();

server.use(helmet());
server.use(morgan('common'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(fileUpload({ createParentPath: true }));

server.use('/api/auth', authRouter);
server.use('/assets/:folder/:filename', (req, res, next) => {
  try {
    return res.status(200).sendFile(`${__dirname}/assets/${req.params['folder']}/${req.params.filename}`);
  } catch (err) {
    next(err)
  }
});

server.use(jwt);
server.use('/api/banner', bannerRouter);
server.use('/api/user', userRouter);
server.use('/api/berita', beritaRouter);
server.use('/api/bank', bankRouter);
server.use('/api/kta', ktaRouter);
server.use('/api/kpr', kprRouter);

server.use((req, res) => {
  return res.status(404).send({
    status: false,
    code: 404,
    message: 'Link tidak ditemukan',
    errors: [
      { path: '', message: 'Link tidak ditemukan' }
    ]
  });
});

server.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send({
      status: false,
      code: 401,
      message: 'Request tidak diperbolehkan',
      errors: [
        { path: '', message: 'Request tidak diperbolehkan' }
      ]
    });
  }

  console.log(err)
  return res.status(err.status || 500).send({
    status: false,
    code: err.status || 500,
    message: 'Ganguan Server. Silahkan coba kembali',
    errors: [
      { path: '', message: 'Ganguan Server. Silahkan coba kembali' }
    ]
  });
});

server.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`Server running on ${process.env.SERVER_PORT || 3000}`)
});

module.exports = server