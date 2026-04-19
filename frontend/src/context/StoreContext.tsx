import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import axios from "axios";
import { food_list as local_food_list } from "../assets/assets";
import { FoodItem, CartItems, ApiResponse, StoreContextValue } from "../types";

// The /api/cart/get endpoint returns { success, cartData } instead of the
// standard ApiResponse shape, so we need a dedicated response type.
interface CartGetResponse {
  success: boolean;
  cartData?: CartItems;
  message?: string;
}

export const StoreContext = createContext<StoreContextValue | null>(null);

/**
 * Custom hook that provides strongly-typed access to StoreContext.
 * Throws if used outside of StoreContextProvider.
 */
export const useStore = (): StoreContextValue => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStore must be used within a StoreContextProvider");
  }
  return ctx;
};

interface StoreContextProviderProps {
  children: ReactNode;
}

const StoreContextProvider = ({ children }: StoreContextProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItems>({});

  let envUrl =
    import.meta.env.VITE_API_URL || "https://biteblitzbackend.vercel.app";
  if (envUrl && !envUrl.startsWith("http")) {
    envUrl = "https://" + envUrl;
  }
  const url: string = envUrl;

  const [token, setToken] = useState<string>("");
  const [food_list, setFoodList] = useState<FoodItem[]>([]);

  const addToCart = async (itemId: string): Promise<void> => {
    // if the user adding for the first time in the cart.
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    }
    // if food already added and quantity is one, then increase the count
    else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    // when user logged in then token gets generated and when item added in the cart then product will be added in the cart data also.
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId: string): Promise<void> => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  // Logic to return the cart total
  const getTotalCartAmount = (): number => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Fetching the food list from the DB.
  const fetchFoodList = useCallback(async (): Promise<void> => {
    try {
      const response = await axios.get<ApiResponse<FoodItem[]>>(
        url + "/api/food/list"
      );
      if (response.data.data && response.data.data.length > 0) {
        setFoodList(response.data.data);
      } else {
        setFoodList(local_food_list as FoodItem[]);
      }
    } catch {
      setFoodList(local_food_list as FoodItem[]);
    }
  }, [url]);

  // Load Cart Data fetches data from particular user's data which displays the actual quantity added of every item.
  const loadCartData = async (userToken: string): Promise<void> => {
    const response = await axios.post<CartGetResponse>(
      url + "/api/cart/get",
      {},
      { headers: { token: userToken } }
    );

    // saving the cart data in cartItems variable
    if (response.data.cartData) {
      setCartItems(response.data.cartData);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList(); // calling fetchFoodList() func.

      // Saving the local storage data in the token state when we reload the webpage, so that when page gets reloaded the user cannot get logged out automatically and display added quantity of every item.
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        // saving
        setToken(savedToken);

        // loading the func when getting the token from localStorage
        await loadCartData(savedToken);
      }
    }
    loadData();
  }, [fetchFoodList]);

  const contextValue: StoreContextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    fetchFoodList,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
