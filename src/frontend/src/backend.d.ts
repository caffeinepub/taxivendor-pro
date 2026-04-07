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
export interface DriverDetails {
    carModel: string;
    mobile: string;
    rcBook: ExternalBlob;
    driverName: string;
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
    adminCreateBooking(vendorPrincipal: Principal, input: BookingInput): Promise<BookingId>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBooking(input: BookingInput): Promise<BookingId>;
    createFacility(input: FacilityInput): Promise<FacilityId>;
    deleteFacility(id: FacilityId): Promise<void>;
    getBooking(id: BookingId): Promise<Booking | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDashboardStats(): Promise<DashboardStats>;
    getMyVendorProfile(): Promise<VendorInfo | null>;
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
    setDriverDetails(id: BookingId, details: DriverDetails): Promise<void>;
    setVendorStatus(principal: Principal, status: VendorStatus): Promise<void>;
    updateBookingStatus(id: BookingId, status: BookingStatus): Promise<void>;
    updateFacility(id: FacilityId, input: FacilityInput): Promise<void>;
    vendorLogin(mobile: string, passwordHash: string): Promise<Principal | null>;
    vendorSignup(input: VendorSignupInput): Promise<void>;
}
