package model;

import java.util.Date;
import java.util.UUID;

public class Person {
  private String name;
  private Date dob;
  private int numberOfRides;
  private int distanceTravelled;
  private UUID currentRideId;
  private String currentRideState;
  private int location;
  private UUID id;

  public String getName() {
    return name;
  }

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public int getLocation() {
    return location;
  }

  public void setLocation(int location) {
    this.location = location;
  }

  public String getCurrentRideState() {
    return currentRideState;
  }

  public void setCurrentRideState(String currentRideState) {
    this.currentRideState = currentRideState;
  }

  public UUID getCurrentRideId() {
    return currentRideId;
  }

  public void setCurrentRideId(UUID currentRideId) {
    this.currentRideId = currentRideId;
  }

  public int getDistanceTravelled() {
    return distanceTravelled;
  }

  public void setDistanceTravelled(int distanceTravelled) {
    this.distanceTravelled = distanceTravelled;
  }

  public int getNumberOfRides() {
    return numberOfRides;
  }

  public void setNumberOfRides(int numberOfRides) {
    this.numberOfRides = numberOfRides;
  }

  public Date getDob() {
    return dob;
  }

  public void setDob(Date dob) {
    this.dob = dob;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Person(String name) {
    this.name = name;
    this.location = 0;
    this.currentRideState = "AVAILABLE";
  }
}