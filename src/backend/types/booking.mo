import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type BookingType = {
    #oneWay;
    #roundTrip;
    #local;
  };

  public type BookingStatus = {
    #new_;
    #confirmed;
    #completed;
    #cancelled;
  };

  /// Driver details attached to a booking
  public type DriverDetails = {
    driverName : Text;
    mobile : Text;
    carModel : Text;
    rcBook : Storage.ExternalBlob;
    rcNumber : Text;
  };

  /// Full booking record
  public type Booking = {
    id : Common.BookingId;
    vendorPrincipal : Principal;
    /// Display name for the booking source — vendor's company name, or "Admin" for admin-created bookings
    vendorName : Text;
    bookingType : BookingType;
    pickupCity : Text;
    pickupState : Text;
    dropCity : Text;
    dropState : Text;
    date : Text;
    time : Text;
    driverEarning : Nat;
    commission : Nat;
    submitterName : Text;
    submitterWhatsApp : Text;
    submitterMobile : Text;
    status : BookingStatus;
    driverDetails : ?DriverDetails;
    createdAt : Int;
  };

  /// Input for creating a booking
  public type BookingInput = {
    bookingType : BookingType;
    pickupCity : Text;
    pickupState : Text;
    dropCity : Text;
    dropState : Text;
    date : Text;
    time : Text;
    driverEarning : Nat;
    commission : Nat;
    submitterName : Text;
    submitterWhatsApp : Text;
    submitterMobile : Text;
  };
};
