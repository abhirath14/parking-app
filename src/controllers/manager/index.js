const { Sequelize } = require('sequelize');
const ParkingSlot = require('../../models/parking_slot.js');
const User = require('../../models/user.js');

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

  var slotNo = req.query.slotNo;
  UserSlot.update(
    {end_time: Date.now()},
    {where: 
      {
        [Sequelize.Op.and]: 
        [
          {user_id: userId},
          {slot_no: slotNo},
          {end_time: null},
          {start_time : {[Op.lte]: Date.now()}}
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
  var month = (currentDate.getMonth() < 10)?("0"+currentDate.getMonth()):currentDate.getMonth();
  var year = currentDate.getFullYear();

  var currentDateString = month + "-" + day + "-" + year;
  var todayDate = new Date(currentDateString);
  
  ParkingSlot.findAll(
    {where: {start_time: {
      [Sequelize.Op.gt]: todayDate
    }}}
  ).then(
    result => {
      if (Array.isArray(result) && result.size() > 0) {
        res.json({
          count: result.size(),
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
  var month = (currentDate.getMonth() < 10)?("0"+currentDate.getMonth()):currentDate.getMonth();
  var year = currentDate.getFullYear();

  var currentDateString = month + "-" + day + "-" + year;
  var todayDate = new Date(currentDateString);
  var fee = 0;

  ParkingSlot.findAll(
    {
      where: {start_time: {[Sequelize.Op.gt]: todayDate}, status: "VACANT"},
    }
  ).then(
    results => {
      if (Array.isArray(results) && results.size() > 0) {
        results.forEach(
          entry => {
            fee += (new Date(entry.end_time) - new Date(entry.start_time))/360000;
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
  var month = (currentDate.getMonth() < 10)?("0"+currentDate.getMonth()):currentDate.getMonth();
  var year = currentDate.getFullYear();

  var currentDateString = month + "-" + day + "-" + year;
  var todayDate = new Date(currentDateString);
  var totalTime = 0;

  ParkingSlot.findAll(
    {
      where: {start_time: {[Sequelize.Op.gt]: todayDate}, status: "VACANT"},
    }
  ).then(
    results => {
      if (Array.isArray(results) && results.size() > 0) {
        results.forEach(
          entry => {
            totalTime += (new Date(entry.end_time) - new Date(entry.start_time))/3600000;
          }
        );
        res.json({
          totalTime: fee,
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