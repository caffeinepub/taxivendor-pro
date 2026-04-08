import Common "common";

module {
  /// A notification record created when any vendor creates a booking
  public type Notification = {
    id : Common.NotificationId;
    bookingId : Common.BookingId;
    vendorId : Principal;
    message : Text;
    createdAt : Common.Timestamp;
  };
};
