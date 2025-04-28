const statusService = require('app/modules/status')

exports.currentStatus = function (req, res) {
  const result = statusService.getStatusReport();

  const httpStatus = result.status === statusService.healthStatusCodes.OK ? 200 : 503;

  res.status(httpStatus).send(result)
}
