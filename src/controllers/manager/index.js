const { Sequelize } = require('sequelize');
const ParkingSlot = require('../../models/parking_slot.js');
const User = require('../../models/user.js');
const UserSlot = require('../../models/user_slot.js');

exports.addNewParkingSlot = (req, res, next) => {
  const product = {
    status: "VACANT",
    start_time: null,
    end_time: null,
    user_id: null
  };

  ParkingSlot.create(product).then(
    result => {
      console.log(result);
      res.json({
        "result": result
      });
    }
  );
}

exports.putToMaintenanceMode = (req, res, next) => {

  var slotNo = req.query.slot_no;
  UserSlot.update(
    {end_time: Date.now()},
    {where: 
      {
        [Sequelize.Op.and]: 
        [
          {slot_no: slotNo},
          {end_time: null}
        ]
      }
    }
  ).then(output => {

    ParkingSlot.update(
      {status: 'UNDER_MAINTENANCE'},
      {where: {slot_no: slotNo}}
    ).then(
      output => {
        var hours = parseFloat(new Date(output.end_time) - new Date(output.start_time)) / 3600;
        res.json({message: `Slot number ${slotNo} put to maintenance mode`, fee: hours*10});
        res.status(200);
      }
    ).catch(err => {
      res.json({message: err});
      res.status(500);
    });
  }).catch(err => {
    res.status(200);
    res.json({message: err});
  });
}

exports.numberOfVehiclesParkedInADay = (req, res, next) => {
  var numberOfVehicles;
  var currentDate = new Date();

  var day = (currentDate.getDate() < 10)?("0"+currentDate.getDate()):currentDate.getDate();
  var month = (currentDate.getMonth() + 1 < 10)?("0"+(currentDate.getMonth() + 1)):currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();

  var currentDateString = month + "-" + day + "-" + year;
  var todayDate = new Date(currentDateString);
  
  UserSlot.findAll(
    {where: {start_time: {
      [Sequelize.Op.gt]: todayDate
    }}}
  ).then(
    result => {
      if (Array.isArray(result) && result.length > 0) {
        res.json({
          count: result.length,
        });
        res.status(200);
      }
    }
  ).catch(err => {
    res.json({
      count: null
    });
    res.status(500);
  });
}

exports.totalFeeCollectedToday = (req, res, next) => {
  var currentDate = new Date();

  var day = (currentDate.getDate() < 10)?("0"+currentDate.getDate()):currentDate.getDate();
  var month = (currentDate.getMonth() + 1 < 10)?("0"+(currentDate.getMonth() + 1)):currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();

  var currentDateString = month + "-" + day + "-" + year;
  var todayDate = new Date(currentDateString);
  var fee = 0;

  UserSlot.findAll(
    {
      where: {start_time: {[Sequelize.Op.gt]: todayDate}, end_time: {[Sequelize.Op.ne]: null}},
    }
  ).then(
    results => {
      if (Array.isArray(results) && results.length > 0) {
        results.forEach(
          entry => {
            fee += (10*Math.ceil(parseFloat(new Date(entry.end_time) - new Date(entry.start_time))/3600000));
          }
        );
        res.json({
          totalFees: fee,
        });
        res.status(200);
      }
    }
  ).catch(err => {
    res.json({
      totalFees: null
    });
    res.status(500);
  });
}

exports.totalParkingTime = (req, res, next) => {
  var currentDate = new Date();

  var day = (currentDate.getDate() < 10)?("0"+currentDate.getDate()):currentDate.getDate();
  var month = (currentDate.getMonth()+1 < 10)?("0"+(currentDate.getMonth() + 1)):currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();

  var currentDateString = month + "-" + day + "-" + year;
  var todayDate = new Date(currentDateString);
  var totalTime = 0;

  UserSlot.findAll(
    {
      where: {start_time: {[Sequelize.Op.gt]: todayDate}},
    }
  ).then(
    results => {
      if (Array.isArray(results) && results.length > 0) {
        results.forEach(
          entry => {
            let endTime = entry.end_time?entry.end_time:Date.now();
            totalTime += (new Date(endTime) - new Date(entry.start_time))/3600000;
          }
        );
        //time in seconds
        res.json({
          totalTimeInSeconds: parseInt(totalTime),
        });
        res.status(200);
      }
    }
  ).catch(err => {
    res.json({
      totalTime: null
    });
    res.status(500);
  });
}

exports.currentParkingLotStatus = (req, res, next) => {

}