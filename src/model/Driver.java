package model;

import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;
import java.lang.Math;

public class Driver extends Person {
  private float rating;
  private UUID vehicleId;
  private static final int nearThreshold = 5;

  public Driver(String name) {
    super(name);
    // TODO Auto-generated constructor stub
  }

  public UUID getVehicleId() {
    return vehicleId;
  }

  public void setVehicleId(UUID vehicleId) {
    this.vehicleId = vehicleId;
  }

  public float getRating() {
    return rating;
  }

  public void setRating(float rating) {
    this.rating = rating;
  }

  public boolean isAvailable(int riderLoc) {
    return (this.getCurrentRideState() == "AVAILABLE" && Math.abs(this.getLocation() - riderLoc) < nearThreshold);
  }

  public Ride acceptRide(ArrayList<Ride> rideLists) {
    Ride pickedRide = null;
    Rider rider = null;
    for (int i = 0; i < rideLists.size(); i++) {
      if (this.isAvailable(rideLists.get(i).getOrigin())) {
        pickedRide = rideLists.get(i);
        break;
      }
    }
    this.setCurrentRideState("OCCUPIED");
    if (pickedRide != null) {
      pickedRide.updateRideStatus("ACCEPTED");
    }
    return pickedRide;
  }

  public void endRide(Ride ride) {
    this.setNumberOfRides(this.getNumberOfRides() + 1);
    this.setDistanceTravelled(this.getDistanceTravelled() + (ride.getDestination() - ride.getOrigin()));
    this.setCurrentRideState("AVAILABLE");
    Main.endRide(ride);
  }
}
