// queries associated with the notes resource
const knex = require('../connection');

const getAllNotes =  () => {
  return knex('notes')
    .select('*');
};
const getNote = (id) => {
  return knex('notes')
    .select('*')
    .where({ id: parseInt(id) });
}
function addNote(note) {
  return knex('notes')
    .insert(note)
    .returning('*');
}
function updateNote(id, note) {
  return knex('notes')
    .update(note)
    .where({ id: parseInt(id) })
    .returning('*');
}
function deleteNote(id) {
  return knex('notes')
    .del()
    .where({ id: parseInt(id) })
    .returning('*');
}
module.exports = {
  getAllNotes,
  getNote,
  addNote,
  updateNote,
  deleteNote
};
