import Map "mo:core/Map";
import List "mo:core/List";
import NewBookingTypes "types/booking";
import NewCabTypes "types/cab";
import NewCommon "types/common";
import NewVendorTypes "types/vendor";
import NewFacilityTypes "types/facility";
import NewCityTypes "types/city";
import NewNotifTypes "types/notification";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  // ── Old types (inline — from .old/src/backend/types/) ────────────────────

  type OldCabId = Nat;
  type OldCab = {
    id : OldCabId;
    vendorId : Principal;
    driverName : Text;
    driverMobile : Text;
    carModel : Text;
    rcBook : Text;
    createdAt : Int;
  };

  type OldBookingType = { #oneWay; #roundTrip; #local };
  type OldBookingStatus = { #new_; #confirmed; #completed; #cancelled };
  type OldDriverDetails = {
    driverName : Text;
    mobile : Text;
    carModel : Text;
    rcBook : Storage.ExternalBlob;
  };

  type OldBooking = {
    id : Nat;
    vendorPrincipal : Principal;
    vendorName : Text;
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

  // These types are unchanged; reuse via their new imports directly.
  // OldVendor, OldFacility, OldCity, OldNotification are identical to new.

  // ── Actor state snapshots ─────────────────────────────────────────────────

  type OldActor = {
    vendors : Map.Map<Principal, NewVendorTypes.Vendor>;
    mobileIndex : Map.Map<Text, Principal>;
    bookings : Map.Map<Nat, OldBooking>;
    facilities : Map.Map<Nat, NewFacilityTypes.Facility>;
    cabs : Map.Map<OldCabId, OldCab>;
    cities : List.List<NewCityTypes.City>;
    notifications : List.List<NewNotifTypes.Notification>;
    var nextBookingId : { var value : Nat };
  };

  type NewActor = {
    vendors : Map.Map<Principal, NewVendorTypes.Vendor>;
    mobileIndex : Map.Map<Text, Principal>;
    bookings : Map.Map<NewCommon.BookingId, NewBookingTypes.Booking>;
    facilities : Map.Map<NewCommon.FacilityId, NewFacilityTypes.Facility>;
    cabs : Map.Map<NewCabTypes.CabId, NewCabTypes.Cab>;
    cities : List.List<NewCityTypes.City>;
    notifications : List.List<NewNotifTypes.Notification>;
    var nextBookingId : { var value : Nat };
  };

  // ── Migration helpers ─────────────────────────────────────────────────────

  func migrateDriverDetails(old : ?OldDriverDetails) : ?NewBookingTypes.DriverDetails {
    switch old {
      case null null;
      case (?d) ?{ d with rcNumber = "" };
    };
  };

  func migrateBooking(id : Nat, old : OldBooking) : NewBookingTypes.Booking {
    { old with driverDetails = migrateDriverDetails(old.driverDetails) };
  };

  func migrateCab(_id : OldCabId, old : OldCab) : NewCabTypes.Cab {
    { old with rcNumber = "" };
  };

  // ── Public migration entry point ──────────────────────────────────────────

  public func run(old : OldActor) : NewActor {
    let bookings = old.bookings.map<Nat, OldBooking, NewBookingTypes.Booking>(migrateBooking);
    let cabs = old.cabs.map<OldCabId, OldCab, NewCabTypes.Cab>(migrateCab);
    {
      vendors = old.vendors;
      mobileIndex = old.mobileIndex;
      bookings;
      facilities = old.facilities;
      cabs;
      cities = old.cities;
      notifications = old.notifications;
      var nextBookingId = old.nextBookingId;
    };
  };
};
