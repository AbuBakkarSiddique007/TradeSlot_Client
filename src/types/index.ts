export interface Trader {
  id: string;
  businessId: string;
  businessName: string;
  name: string;
  email: string;
  phone: string | null;
  stripeAccountId?: string | null;
  stripeOnboarded: boolean;
  workingHoursStart: string;
  workingHoursEnd: string;
  defaultJobDuration: number;
  defaultBufferTime: number;
}


export interface WorkArea {
  id: string;
  traderId: string;
  date: string;
  zoneName: string;
}


export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type ChannelType = "whatsapp" | "webchat";

export interface Booking {
  id: string;
  traderId: string;
  channelType: ChannelType;
  customerRef: string;
  customerName: string;
  customerLocation: string;
  serviceDescription: string;
  startTime: string;
  endTime: string;
  bufferMinutes: number;
  bufferedEndTime: string;
  status: BookingStatus;
  totalPrice: number;
  feeAmount: number;
}


export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  applicationFeeAmount: number;
  traderPayoutAmount: number;
  status: PaymentStatus;
}


export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  businessName?: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  trader: Trader;
}


export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
