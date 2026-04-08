import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type BookingId = bigint;
export type Timestamp = bigint;
export interface Cab {
    id: CabId;
    carModel: string;
    driverMobile: string;
    createdAt: bigint;
    rcNumber: string;
    vendorId: Principal;
    rcBook: string;
    driverName: string;
}
export interface VendorSignupInput {
    name: string;
    drivingLicence: ExternalBlob;
    companyName: string;
    aadhaarCard: ExternalBlob;
    passwordHash: string;
    mobile: string;
}
export type FacilityId = bigint;
export interface Facility {
    id: FacilityId;
    active: boolean;
    name: string;
    createdAt: bigint;
    description: string;
}
export interface DriverDetails {
    carModel: string;
    rcNumber: string;
    mobile: string;
    rcBook: ExternalBlob;
    driverName: string;
}
export interface DashboardStats {
    newBookings: bigint;
    cancelledBookings: bigint;
    totalBookings: bigint;
    approvedVendors: bigint;
    confirmedBookings: bigint;
    completedBookings: bigint;
    pendingVendors: bigint;
    totalVendors: bigint;
}
export interface FacilityInput {
    active: boolean;
    name: string;
    description: string;
}
export interface UserApprovalInfo {
    status: ApprovalStatus;
    principal: Principal;
}
export interface City {
    city: string;
    state: string;
}
export type CabId = bigint;
export type NotificationId = bigint;
export interface Notification {
    id: NotificationId;
    bookingId: BookingId;
    createdAt: Timestamp;
    message: string;
    vendorId: Principal;
}
export interface VendorBookingStats {
    newBookings: bigint;
    cancelledBookings: bigint;
    totalBookings: bigint;
    confirmedBookings: bigint;
    completedBookings: bigint;
}
export interface Booking {
    id: BookingId;
    status: BookingStatus;
    submitterName: string;
    driverDetails?: DriverDetails;
    submitterMobile: string;
    date: string;
    createdAt: bigint;
    time: string;
    vendorPrincipal: Principal;
    commission: bigint;
    submitterWhatsApp: string;
    pickupCity: string;
    pickupState: string;
    driverEarning: bigint;
    bookingType: BookingType;
    dropState: string;
    vendorName: string;
    dropCity: string;
}
export interface BookingInput {
    submitterName: string;
    submitterMobile: string;
    date: string;
    time: string;
    commission: bigint;
    submitterWhatsApp: string;
    pickupCity: string;
    pickupState: string;
    driverEarning: bigint;
    bookingType: BookingType;
    dropState: string;
    dropCity: string;
}
export interface VendorInfo {
    status: VendorStatus;
    principal: Principal;
    name: string;
    createdAt: bigint;
    drivingLicence: ExternalBlob;
    companyName: string;
    aadhaarCard: ExternalBlob;
    mobile: string;
}
export enum BookingStatus {
    new_ = "new",
    cancelled = "cancelled",
    completed = "completed",
    confirmed = "confirmed"
}
export enum BookingType {
    local = "local",
    roundTrip = "roundTrip",
    oneWay = "oneWay"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum VendorStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export interface backendInterface {
    addCab(driverName: string, driverMobile: string, carModel: string, rcBook: string, rcNumber: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminCreateBooking(input: BookingInput): Promise<BookingId>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBooking(input: BookingInput): Promise<BookingId>;
    createFacility(input: FacilityInput): Promise<FacilityId>;
    deleteFacility(id: FacilityId): Promise<void>;
    getAllCabs(): Promise<Array<Cab>>;
    getBooking(id: BookingId): Promise<Booking | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDashboardStats(): Promise<DashboardStats>;
    getLatestNotifications(): Promise<Array<Notification>>;
    getMyBookingStats(): Promise<VendorBookingStats>;
    getMyVendorProfile(): Promise<VendorInfo | null>;
    getVendorBookingStats(vendorPrincipal: Principal): Promise<VendorBookingStats>;
    getVendorCabs(): Promise<Array<Cab>>;
    getVendorNotifications(vendorId: Principal): Promise<Array<Notification>>;
    getVendorProfile(principal: Principal): Promise<VendorInfo | null>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    listAllBookings(vendorFilter: Principal | null): Promise<Array<Booking>>;
    listAllVendors(): Promise<Array<VendorInfo>>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    listFacilities(): Promise<Array<Facility>>;
    listMyBookings(): Promise<Array<Booking>>;
    requestApproval(): Promise<void>;
    searchCities(prefix: string): Promise<Array<City>>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
    setDriverDetails(id: BookingId, details: DriverDetails): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setVendorStatus(principal: Principal, status: VendorStatus): Promise<void>;
    updateBookingStatus(id: BookingId, status: BookingStatus): Promise<void>;
    updateFacility(id: FacilityId, input: FacilityInput): Promise<void>;
    vendorLogin(mobile: string, passwordHash: string): Promise<Principal | null>;
    vendorSignup(input: VendorSignupInput): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
