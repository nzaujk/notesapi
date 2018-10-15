const Router = require('koa-router');
const queries = require('../db/queries/notes');

const router = new Router();
const BASE_URL = `/api/v1/notes`;

router.get(BASE_URL, async (ctx) => {
  try {
    const notes = await queries.getAllNotes();
    ctx.body = {
      status: 'success',
      data: notes
    };
  } catch (err) {
    console.log(err)
  }
});
router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const note = await queries.getNote(ctx.params.id);
    if (note.length) {
    ctx.body = {
      status: 'success',
      data: note
    }} else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'The note does not exist'
      };
  }}catch (err) {
    console.log(err)
  }
});
router.post(`${BASE_URL}`, async (ctx) => {
  try {
    const note = await queries.addNote(ctx.request.body);
    if (note.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: note
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Could not add a new story.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'An error occurred and the process was not completed'
    };
  }
});
router.put(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const note = await queries.updateNote(ctx.params.id, ctx.request.body);
    if (note.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: note
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'The note does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Update not successful an error has occurred.'
    };
  }
});

router.delete(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const note = await queries.deleteNote(ctx.params.id);
    if (note.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: note
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'The note does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Delete unsuccessful.'
    };
  }
});

module.exports = router;