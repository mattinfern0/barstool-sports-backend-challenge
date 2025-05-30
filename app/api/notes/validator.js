const { validate, Validator } = require('app/api/common')
const { body } = validate

class NotesValidator extends Validator {
  async create(req) {
    const validations = [
      body('title').notEmpty(),
      body('message').notEmpty(),
    ]
    await this.validate(req, validations, { sanitize: 'query' })
  }
}

module.exports = new NotesValidator()
