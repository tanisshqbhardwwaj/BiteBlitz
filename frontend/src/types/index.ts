// Food item as returned by the API / stored in MongoDB
export interface FoodItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

// Generic wrapper that matches the backend { success, data?, message? } shape
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

// Cart is a map of food-item _id → quantity
export type CartItems = Record<string, number>;

// Delivery address used when placing an order
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

// A single item inside an Order document
export interface OrderItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Order document returned by the API
export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  amount: number;
  address: DeliveryAddress;
  status: string;
  date: string | Date;
  payment: boolean;
}

// Registered / logged-in user
export interface User {
  _id: string;
  name: string;
  email: string;
  cartData: CartItems;
}

// Value provided by StoreContext
export interface StoreContextValue {
  food_list: FoodItem[];
  cartItems: CartItems;
  setCartItems: React.Dispatch<React.SetStateAction<CartItems>>;
  addToCart: (itemId: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  getTotalCartAmount: () => number;
  url: string;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  fetchFoodList: () => Promise<void>;
}
