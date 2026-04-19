import { Request } from "express";

// ------------------------------------------------------------------
// Shared data shapes (mirror the Mongoose schemas)
// ------------------------------------------------------------------

/** Cart stored per user: food-item _id → quantity */
export type CartData = Record<string, number>;

/** A food item document returned from the DB */
export interface FoodItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

/** A single line-item inside an Order */
export interface OrderItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

/** Delivery / shipping address */
export interface DeliveryAddress {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  phone: string;
}

/** Order document from the DB */
export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  amount: number;
  address: DeliveryAddress;
  status: string;
  date: Date;
  payment: boolean;
}

/** Registered user document */
export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  cartData: CartData;
}

// ------------------------------------------------------------------
// Generic API response shape (mirrors all backend res.json calls)
// ------------------------------------------------------------------
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

// ------------------------------------------------------------------
// Request body / payload types
// ------------------------------------------------------------------

/** Body sent to POST /api/cart/add and POST /api/cart/remove */
export interface CartItemPayload {
  userId: string; // injected by authMiddleware
  itemId: string;
}

/** Body sent to POST /api/cart/get */
export interface GetCartPayload {
  userId: string; // injected by authMiddleware
}

/** Body sent to POST /api/user/register */
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

/** Body sent to POST /api/user/login */
export interface LoginPayload {
  email: string;
  password: string;
}

/** Body sent to POST /api/order/place */
export interface PlaceOrderPayload {
  userId: string; // injected by authMiddleware
  items: OrderItem[];
  amount: number;
  address: DeliveryAddress;
}

/** Body sent to POST /api/order/verify */
export interface VerifyOrderPayload {
  orderId: string;
  success: string; // Stripe sends "true" / "false" as a string
}

/** Body sent to POST /api/order/status */
export interface UpdateStatusPayload {
  orderId: string;
  status: string;
}

/** Body sent to POST /api/food/remove */
export interface RemoveFoodPayload {
  id: string;
}

// ------------------------------------------------------------------
// Typed Express Request helpers
// ------------------------------------------------------------------

/** Express Request with a typed body */
export type TypedRequest<T> = Request<
  Record<string, string>,
  unknown,
  T
>;

/** Request whose body has been augmented by authMiddleware with userId */
export type AuthenticatedRequest<
  T extends Record<string, unknown> = Record<string, unknown>
> = Request<Record<string, string>, unknown, T & { userId: string }>;
