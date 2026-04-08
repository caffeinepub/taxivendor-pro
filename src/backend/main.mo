import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import UserApproval "mo:caffeineai-user-approval/approval";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import VendorTypes "types/vendor";
import BookingTypes "types/booking";
import FacilityTypes "types/facility";
import CityTypes "types/city";
import NotifTypes "types/notification";
import Common "types/common";
import CityLib "lib/city";
import VendorMixin "mixins/vendor-api";
import BookingMixin "mixins/booking-api";
import FacilityMixin "mixins/facility-api";
import CityMixin "mixins/city-api";
import StatsMixin "mixins/stats-api";

actor {
  // ── Authorization & object storage (framework-provided) ──────────────────
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinObjectStorage();

  // ── User approval (framework-provided) ───────────────────────────────────
  let approvalState = UserApproval.initState(accessControlState);

  public query ({ caller }) func isCallerApproved() : async Bool {
    AccessControl.hasPermission(accessControlState, caller, #admin) or UserApproval.isApproved(approvalState, caller);
  };

  public shared ({ caller }) func requestApproval() : async () {
    UserApproval.requestApproval(approvalState, caller);
  };

  public shared ({ caller }) func setApproval(user : Principal, status : UserApproval.ApprovalStatus) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.setApproval(approvalState, user, status);
  };

  public query ({ caller }) func listApprovals() : async [UserApproval.UserApprovalInfo] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.listApprovals(approvalState);
  };

  // ── Domain state ──────────────────────────────────────────────────────────
  let vendors = Map.empty<Principal, VendorTypes.Vendor>();
  let mobileIndex = Map.empty<Text, Principal>();
  let bookings = Map.empty<Common.BookingId, BookingTypes.Booking>();
  let facilities = Map.empty<Common.FacilityId, FacilityTypes.Facility>();
  let cities = List.empty<CityTypes.City>();
  let notifications = List.empty<NotifTypes.Notification>();

  // ── Seed cities on init ───────────────────────────────────────────────────
  CityLib.seedCities(cities);

  // ── Domain mixins ─────────────────────────────────────────────────────────
  include VendorMixin(vendors, mobileIndex);
  include BookingMixin(vendors, bookings, notifications);
  include FacilityMixin(facilities);
  include CityMixin(cities);
  include StatsMixin(vendors, bookings);
};
