
const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'Welcome to Notes API!'
  };
});

module.exports = router;