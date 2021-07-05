package model;

import java.util.UUID;

public class Ride {
  private UUID id;
  private UUID driverId;
  private UUID riderId;
  private String status;
  private int origin;
  private int destination;
  private int numberOfSeatsOccupied;
  private UUID vehicleId;
  private static final int farePerKM = 20;
  private double fareCharged;

  public Ride(UUID riderId, int origin, int destination, int numberOfSeatsOccupied) {
    this.id = UUID.randomUUID();
    this.origin = origin;
    this.destination = destination;
    this.numberOfSeatsOccupied = numberOfSeatsOccupied;
    this.status = "REQUESTED";
  }

  public double calculateFare(boolean preferredRider) {
    if (preferredRider) {
      if (this.numberOfSeatsOccupied == 1) {
        return 0.75 * farePerKM * (this.destination - this.origin);
      } else if (this.numberOfSeatsOccupied >= 2) {
        return 0.5 * farePerKM * (this.destination - this.origin) * this.numberOfSeatsOccupied;
      }
    } else {
      if (this.numberOfSeatsOccupied == 1) {
        return farePerKM * (this.destination - this.origin);
      } else if (this.numberOfSeatsOccupied >= 2) {
        return 0.75 * farePerKM * (this.destination - this.origin) * this.numberOfSeatsOccupied;
      }
    }
    return 0;
  }

  public Ride updateRideStatus(String newStatus) {
    this.status = newStatus;
    return this;
  }

  public UUID getId() {
    return id;
  }

  public double getFareCharged() {
    return fareCharged;
  }

  public void setFareCharged(double fareCharged) {
    this.fareCharged = fareCharged;
  }

  public static int getFareperkm() {
    return farePerKM;
  }

  public UUID getVehicleId() {
    return vehicleId;
  }

  public void setVehicleId(UUID vehicleId) {
    this.vehicleId = vehicleId;
  }

  public int getNumberOfSeatsOccupied() {
    return numberOfSeatsOccupied;
  }

  public void setNumberOfSeatsOccupied(int numberOfSeatsOccupied) {
    this.numberOfSeatsOccupied = numberOfSeatsOccupied;
  }

  public int getDestination() {
    return destination;
  }

  public void setDestination(int destination) {
    this.destination = destination;
  }

  public int getOrigin() {
    return origin;
  }

  public void setOrigin(int origin) {
    this.origin = origin;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public UUID getRiderId() {
    return riderId;
  }

  public void setRiderId(UUID riderId) {
    this.riderId = riderId;
  }

  public UUID getDriverId() {
    return driverId;
  }

  public void setDriverId(UUID driverId) {
    this.driverId = driverId;
  }

  public void setId(UUID id) {
    this.id = id;
  }
}
