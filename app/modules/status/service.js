const mongodb = require('app/lib/mongodb');

const HealthStatusCodes = {
  OK: "OK",
  ERROR: "ERROR"
}

class StatusService {
  get healthStatusCodes() {
    return HealthStatusCodes;
  }

  getStatusReport() {
    let overallStatus = HealthStatusCodes.OK;

    if (mongodb.readyState !== mongodb.ReadyStates.connected) {
      overallStatus = HealthStatusCodes.ERROR;
    }

    return {
      "status": overallStatus
    };
  }
}

module.exports = StatusService;