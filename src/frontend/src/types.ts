// Core domain types for KabGo vendor app

export type VendorStatus = "pending" | "approved" | "rejected";
export type BookingType = "one_way" | "round_trip" | "local";
export type BookingStatus = "new" | "confirmed" | "completed" | "cancelled";

export interface Vendor {
  id: string;
  name: string;
  mobile: string;
  drivingLicence: string;
  aadhaarCard: string;
  companyName: string;
  status: VendorStatus;
  createdAt: number;
  licenceDocUrl?: string;
  aadhaarDocUrl?: string;
}

export interface DriverDetails {
  driverName: string;
  mobile: string;
  car: string;
  rcNumber: string;
  rcBookUrl?: string;
}

export interface Booking {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorMobile: string;
  vendorWhatsapp: string;
  bookingType: BookingType;
  pickupCity: string;
  pickupState: string;
  dropCity: string;
  dropState: string;
  date: string;
  time: string;
  driverEarning: number;
  commission: number;
  status: BookingStatus;
  driverDetails?: DriverDetails;
  createdAt: number;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  active: boolean;
  createdAt: number;
}

export interface City {
  id: string;
  name: string;
  state: string;
}

export interface AdminStats {
  totalVendors: number;
  pendingApprovals: number;
  totalBookings: number;
  activeBookings: number;
  totalFacilities: number;
}

export interface VendorSession {
  id: string;
  name: string;
  mobile: string;
  companyName: string;
  status: VendorStatus;
  isAdmin: boolean;
}

export interface LoginCredentials {
  mobile: string;
  password: string;
}

export interface SignupData {
  name: string;
  mobile: string;
  password: string;
  drivingLicence: string;
  aadhaarCard: string;
  companyName: string;
}

export interface Cab {
  id: string;
  vendorId: string;
  driverName: string;
  driverMobile: string;
  carModel: string;
  rcBook: string;
  rcNumber: string;
  createdAt: number;
}

export interface CreateBookingData {
  bookingType: BookingType;
  pickupCity: string;
  pickupState: string;
  dropCity: string;
  dropState: string;
  date: string;
  time: string;
  driverEarning: number;
  commission: number;
  vendorMobile: string;
  vendorWhatsapp: string;
}
