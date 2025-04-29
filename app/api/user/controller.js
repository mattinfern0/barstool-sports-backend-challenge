const userService = require('app/modules/user')

/**
 * @method read
 */
exports.read = async (req, res) => {
  const user = await userService.findById(req.params.id)
  res.status(200).send(user)
}

/**
 * @method update
 */
exports.update = async (req, res) => {
  /*
    Originally the starter code called userService.readAndUpdate. Since this function
    doesn't exist in the Service class it resulted in a 500 error even when called with
    the correct user. I changed this code to work properly, but not sure if this is outside
    the scope of this challenge.
  */
  const user = await userService.findByIdAndUpdate(req.params.id, req.body)
  res.status(200).send(user)
}
