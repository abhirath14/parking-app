const { Sequelize } = require('sequelize');
const ParkingSlot = require('../../models/parking_slot.js');
const User = require('../../models/user.js');
const UserSlot = require('../../models/user_slot.js');

exports.unParkVehicleForUserId = (req, res, next) => {
  var userId = req.body.userId;
  var slotNo = req.body.slot_no;
  ParkingSlot.update(
    {status: 'VACANT'},
    {where: {slot_no: slotNo}}
  ).then(result => {
    console.log(result);
    UserSlot.update(
      {end_time: Date.now()},
      {where: 
        {
          [Sequelize.Op.and]: [{user_id: userId}, {slot_no: slotNo}]
        }
      }
    ).then(output => {
      var hours = parseFloat(new Date(output.end_time) - new Date(output.start_time)) / 3600000;
      res.json({message: "success", fee: hours*10});
      res.status(200);
    }).catch(err => {
      res.status(200);
      res.json({message: err});
    });
  }).catch(err => {
    res.status(200);
    res.json({message: err});
  });
}

async function nextVacantSlot() {
  var slot;
  try {
    slot = await ParkingSlot.findOne(
      {
        where: {
          status: 'VACANT'
        },
        attributes: ['slot_no']
      }
    );  
  } catch (err) {
    console.log(err);
  }
  console.log(slot)
  return slot;
}
exports.bookNextParkingSlots = async (req, res, next) => {

  var slot = await nextVacantSlot();
  if (!slot) {
    res.status(200);
    return res.json({message: "No slot found"});
  }
  ParkingSlot.findOne(
    {
      where: {
        slot_no: slot.slot_no
      }
    }
  ).then(result => {
    if (!result) {
      res.status(200);
      return res.json({message: "No slot found"});
    }
  }).catch(err => {
    res.json({message: err});
    res.status(200);
    return;
  });

  ParkingSlot.update(
    {status: "PARKED", start_time: Date.now(), end_time: null},
    {where: 
      {
        slot_no: slot.slot_no
      }
    }
  ).then(
    result => {
      if (result) {
        res.json({message: `Slot number ${slot.slot_no} booked for parking`});
        res.status(200);
      }
    }
  ).catch(
    err => {
      res.json({message: err});
      res.status(200);
    }
  );
}
exports.addUser = (req, res, next) => {
  var username = req.body.name;
  var designation = req.body.designation;
  const user = {
    name: username,
    designation: designation
  };

  User.create(user).then(
    result => {
      res.json({message: result});
      res.status(200);
    }
  ).catch(err => {
    res.json({message: err});
    res.status(500);
  });
}