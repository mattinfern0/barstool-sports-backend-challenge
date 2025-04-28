const notesService = require('app/modules/notes')
const mongoose = require('mongoose')

/**
 * @method read
 */
exports.readList = async (req, res) => {
  const userId = req.params.id
  const notes = await notesService.find({ userId: userId })
  res.status(200).send(notes)
}
