export interface Product {
  url?: string;
  file_name?: string;
  category: string;
  name: string;
  price?: number;
  props?: [{ name: string; value: string }];
}
