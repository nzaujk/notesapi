const Koa = require('koa');

const app = new Koa();
const PORT = 3000;

app.use(async ctx=> {
  ctx.body = {
  status: 200,
  message: 'successful'
};
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;