package model;

import java.util.ArrayList;
import java.util.UUID;

public class Main {
  public static ArrayList<Ride> rideList = new ArrayList<Ride>();
  public static ArrayList<Driver> driverList = new ArrayList<Driver>();
  public static ArrayList<Rider> riderList = new ArrayList<Rider>();

  public static Rider addRider(String name) {
    Rider rider = new Rider(name);
    riderList.add(rider);
    return rider;
  }

  public static Driver addDriver(String name) {
    Driver driver = new Driver(name);
    driverList.add(driver);
    return driver;
  }

  public static boolean endRide(Ride ride) {
    UUID riderId = ride.getRiderId();
    Rider rider = null;
    for (int i = 0; i < riderList.size(); i++) {
      if (riderList.get(i).getId() == riderId) {
        rider = riderList.get(i);
        break;
      }
    }

    rider.setCurrentRideState("AVAILABLE");
    int fare = (int) ride.calculateFare(rider.isPreferredRider());
    System.out.println("Fare for rider " + rider.getName() + " for ride from " + ride.getOrigin() + " to destination "
        + ride.getDestination() + " is " + fare);
    ride.setFareCharged(fare);
    ride.updateRideStatus("ENDED");
    return true;
  }

  public static void main(String[] args) {
    Rider rider1 = addRider("Shubham");
    Rider rider2 = addRider("Satyajeet");
    Driver driver1 = addDriver("Raju");
    Driver driver2 = addDriver("Ramu");

    rider1.requestRide(0, 200, 1);
    rider2.requestRide(4, 150, 2);

    Ride ride1 = driver1.acceptRide(rideList);
    Ride ride2 = driver2.acceptRide(rideList);
    if (ride1 != null) {
      driver1.endRide(ride1);
    }
    if (ride2 != null) {
      driver2.endRide(ride2);
    }
  }
}
