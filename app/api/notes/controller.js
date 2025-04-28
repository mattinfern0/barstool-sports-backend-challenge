const notesService = require('app/modules/notes')

/**
 * @method read
 */
exports.readList = async (req, res) => {
  const notes = await notesService.find({ userId: req.params.id })
  res.status(200).send(notes)
}
