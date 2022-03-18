export interface Product {
  id?: string;
  url?: string;
  file_name?: string;
  category: string;
  name: string;
  description?: string;
  short_description?: string;
  price?: number;
  wholesale?: number;
  price_off?:number;
  props?: [{ name: string; value: string }];
  sold?: boolean;
  promo?: boolean;
  payment_method?: string;
  condition?: boolean;
}
