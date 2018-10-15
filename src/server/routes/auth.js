const Router = require('koa-router');
const passport = require('koa-passport');
const queries = require('../db/queries/users');

const router = new Router();
router.get('/auth/register', async (ctx) => {
  ctx.status = 200;
  ctx.body = {
    message: 'register to continue'
  }
});

router.post('/auth/register', async (ctx) => {
  const user = await queries.addUser(ctx.request.body);
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.login(user);
      ctx.redirect('/auth/status');
    } else {
      ctx.status = 400;
      ctx.body = { status: 'error' };
    }
  })(ctx);
});

router.get('/auth/status', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      message: 'User is authenticated'
    }
  } else {
    ctx.redirect('/auth/login');
  }
});

router.get('/auth/login', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.status = 401;
    ctx.body = {
      status: 'unauthorized',
      message: 'Authentication error'
    }
  } else {
    ctx.redirect('/auth/status');
  }
});

router.post('/auth/login', async (ctx) => {
  return passport.authenticate('local', (err, user) => {
    if (user) {
      ctx.login(user);
      ctx.redirect('/auth/status');
    } else {
      ctx.status = 400;
      ctx.body = { status: 'error' };
    }
  })(ctx);
});
router.get('/auth/logout', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.redirect('/auth/login');
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
});

module.exports = router;
