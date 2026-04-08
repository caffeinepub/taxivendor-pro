import List "mo:core/List";
import Common "../types/common";
import NotifTypes "../types/notification";

module {
  /// Create a notification record for a new booking and append to the list
  public func addNotification(
    notifications : List.List<NotifTypes.Notification>,
    nextId : Nat,
    bookingId : Common.BookingId,
    vendorId : Principal,
    now : Common.Timestamp,
  ) : () {
    let notif : NotifTypes.Notification = {
      id = nextId;
      bookingId;
      vendorId;
      message = "New booking #" # debug_show(bookingId) # " created";
      createdAt = now;
    };
    notifications.add(notif);
  };

  /// Get the last 20 notifications across all vendors (newest first)
  public func getLatestNotifications(
    notifications : List.List<NotifTypes.Notification>,
  ) : [NotifTypes.Notification] {
    notifications.reverseValues().take(20).toArray();
  };

  /// Get notifications related to a specific vendor (they created the booking)
  public func getVendorNotifications(
    notifications : List.List<NotifTypes.Notification>,
    vendorId : Principal,
  ) : [NotifTypes.Notification] {
    notifications.reverseValues()
      .filter(func(n : NotifTypes.Notification) : Bool {
        n.vendorId == vendorId
      })
      .take(50)
      .toArray();
  };
};
