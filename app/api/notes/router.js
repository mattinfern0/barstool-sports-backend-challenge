const controller = require('./controller')
const auth = require('./auth')
const validator = require('./validator')

module.exports = (router) => {
  /*
    This function could also be in the users router since it starts with /user,
    I put it here to group all note-related routes together.
   */
  router.get('/user/:id/notes', async (req, res) => {
    await auth.requiresCurrentUser(req)
    await controller.readList(req, res)
  })

  router.post('/note', async (req, res) => {
    await auth.requiresLogin(req)
    await validator.create(req)
    await controller.create(req, res)
  })
}
