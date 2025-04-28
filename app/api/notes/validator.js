const { validate, Validator } = require('app/api/common')
const { body } = validate

class UserValidator extends Validator {
  async create(req) {
    const validations = [
      body('title'),
      body('message'),
    ]
    await this.validate(req, validations, { sanitize: 'query' })
  }
}

module.exports = new UserValidator()
