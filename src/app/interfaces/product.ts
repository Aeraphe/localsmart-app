export interface Product {
  id?: string;
  url?: string;
  file_name?: string;
  category: string;
  name: string;
  price?: number;
  props?: [{ name: string; value: string }];
  sold?: boolean;
  promo?: boolean;
  payment_method?: string;
  condition?: boolean;
}
