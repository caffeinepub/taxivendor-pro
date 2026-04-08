import Map "mo:core/Map";
import Storage "mo:caffeineai-object-storage/Storage";
import NewBookingTypes "types/booking";
import Common "types/common";

module {
  // ── Old types (copied from .old/src/backend/types/booking.mo) ────────────
  type OldBookingType = { #oneWay; #roundTrip; #local };
  type OldBookingStatus = { #new_; #confirmed; #completed; #cancelled };
  type OldDriverDetails = {
    driverName : Text;
    mobile : Text;
    carModel : Text;
    rcBook : Storage.ExternalBlob;
  };
  type OldBooking = {
    id : Common.BookingId;
    vendorPrincipal : Principal;
    bookingType : OldBookingType;
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
    status : OldBookingStatus;
    driverDetails : ?OldDriverDetails;
    createdAt : Int;
  };

  type OldActor = {
    bookings : Map.Map<Common.BookingId, OldBooking>;
  };

  type NewActor = {
    bookings : Map.Map<Common.BookingId, NewBookingTypes.Booking>;
  };

  /// Upgrade migration: adds vendorName field to all existing bookings.
  /// Existing bookings get vendorName = "" (unknown at migration time).
  public func run(old : OldActor) : NewActor {
    let bookings = old.bookings.map<Common.BookingId, OldBooking, NewBookingTypes.Booking>(
      func(_id, b) {
        {
          id = b.id;
          vendorPrincipal = b.vendorPrincipal;
          vendorName = "";
          bookingType = b.bookingType;
          pickupCity = b.pickupCity;
          pickupState = b.pickupState;
          dropCity = b.dropCity;
          dropState = b.dropState;
          date = b.date;
          time = b.time;
          driverEarning = b.driverEarning;
          commission = b.commission;
          submitterName = b.submitterName;
          submitterWhatsApp = b.submitterWhatsApp;
          submitterMobile = b.submitterMobile;
          status = b.status;
          driverDetails = b.driverDetails;
          createdAt = b.createdAt;
        };
      }
    );
    { bookings };
  };
};
