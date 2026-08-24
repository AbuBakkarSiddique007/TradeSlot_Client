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
  postalCodes?: string[];
}

export interface SetWorkAreaDto {
  date: string;
  zoneName: string;
  postalCodes?: string[];
}


export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type ChannelType = "whatsapp" | "webchat";

export interface ScheduleBooking {
  id: string;
  customerName: string;
  customerLocation: string;
  serviceDescription: string;
  channelType: ChannelType;
  startTime: string;
  endTime: string;
  bufferMinutes: number;
  bufferedEndTime: string;
  status: BookingStatus;
  totalPrice: number;
  paymentStatus: string;
}

export interface AvailableSlot {
  start: string;
  end: string;
  startHHmm: string;
  endHHmm: string;
  bufferMinutes: number;
}

export interface DailyScheduleResponse {
  success: boolean;
  traderId: string;
  date: string;
  workingHours: {
    start: string;
    end: string;
    startHHmm: string;
    endHHmm: string;
  };
  durationMinutes: number;
  bufferMinutes: number;
  slotStepMinutes: number;
  bookings: ScheduleBooking[];
  occupied: Array<{
    startTime: string;
    endTime: string;
    bufferedEndTime: string;
    status: BookingStatus;
  }>;
  slots: AvailableSlot[];
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
