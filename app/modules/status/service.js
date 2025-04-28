const mongodb = require('app/lib/mongodb');

const HealthStatusCodes = {
  OK: "OK",
  ERROR: "ERROR"
}

class StatusService {
  get healthStatusCodes() {
    return HealthStatusCodes;
  }

  /*
    Get report of all services the API depends on. Theoretically could have separate statuses per service
    (i.e. DB: OK, someOtherMicroservice: ERROR)
  */
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