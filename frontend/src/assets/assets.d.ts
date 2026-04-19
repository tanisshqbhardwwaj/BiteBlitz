import { FoodItem } from "../types";

// Image assets object
export declare const assets: Record<string, string>;

// Menu category list
export declare const menu_list: Array<{
  menu_name: string;
  menu_image: string;
}>;

// Local fallback food list (empty in production, pre-filled for dev)
export declare const food_list: FoodItem[];
