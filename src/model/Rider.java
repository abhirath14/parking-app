package model;

import java.util.Date;

public class Rider extends Person {
  private final static int rideThreshold = 10;

  public Rider(String name) {
    super(name);
    // TODO Auto-generated constructor stub
  }

  public boolean isPreferredRider() {
    return (this.getNumberOfRides() > rideThreshold);
  }

  public Ride requestRide(int source, int destination, int numberOfSeats) {
    Ride newRide = new Ride(this.getId(), source, destination, numberOfSeats);
    Main.rideList.add(newRide);
    return newRide;
  }
}
