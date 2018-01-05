const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const RedisStore = require('koa-redis');

const app = new Koa();
const PORT = process.env.PORT || 3000;

app.keys = ['secretkey'];
app.use(session({ store: new RedisStore() }, app));
app.use(bodyParser());

require('./auth');
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes.routes());
app.use(indexRoutes.routes());
app.use(notesRoutes.routes());


const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;