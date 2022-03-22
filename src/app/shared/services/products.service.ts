import { Injectable } from '@angular/core';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  FirebaseStorage,
} from 'firebase/storage';
import { FirebaseStorageService } from './firebase-storage.service';
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { Product } from 'src/app/interfaces/product';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productFilesFolder = 'product-images';
  private productColectionName = 'products';
  private db = getFirestore();
  private storage: FirebaseStorage;

  constructor(private storageService: FirebaseStorageService) {
    this.storage = this.storageService.getStorage();
  }

  uploadProductImage = async (file: File, postData: Product) => {
    let imgRef = ref(this.storage, `${this.productFilesFolder}/${file.name}`);

    let snapshot = await uploadBytes(imgRef, file);
    let url = await getDownloadURL(snapshot.ref);
    let data: Product = { ...postData, url, file_name: file.name };
    this.handleSaveImageDataOnDb(data);
  };

  private handleSaveImageDataOnDb = async (product: Product) => {
    let fileExtension = product.file_name?.split('.').pop();
    let newFileName = 'produtc_' + Date.now() + '_.' + fileExtension;
    const docRef = await addDoc(
      collection(this.db, this.productColectionName),
      {
        url: product.url,
        category: product?.category,
        name: product?.name,
        description: product?.description,
        short_description: product?.short_description,
        price: product?.price || 0,
        wholesale: product?.wholesale || 0,
        props: product?.props || [],
        fileName: newFileName,
        originalFileName: product.file_name,
        sold: product.sold,
        condition: product.condition,
        payment_method: product.payment_method,
        promo: product.promo,
        softdeleted: false,
        data: new Date(),
      }
    );
  };

  getProducts = (): Observable<[]> => {
    let sub = new Subject();
    let products$ = sub.asObservable() as Observable<[]>;
    let productsColections = collection(this.db, this.productColectionName);

    onSnapshot(productsColections, (snapshot) => {
      let products: any = [];
      getDocs(productsColections).then((item) => {
        item.forEach((doc: any) => {
          if (!doc.data().softdeleted) {
            products.push({ ...doc.data(), id: doc.id });
          }
        });
        sub.next(products);
      });
    });

    return products$;
  };

  getAllProducts = (): Observable<[]> => {
    let sub = new Subject();
    let products$ = sub.asObservable() as Observable<[]>;
    let productsColections = collection(this.db, this.productColectionName);

    onSnapshot(productsColections, (snapshot) => {
      let products: any = [];
      getDocs(productsColections).then((item) => {
        item.forEach((doc: any) => {
          products.push({ ...doc.data(), id: doc.id });
        });
        sub.next(products);
      });
    });

    return products$;
  };

  onProductCollectionChange = () => {};

  getProductById = async (id: string | null) => {
    if (id) {
      let productRef = doc(this.db, this.productColectionName + '/' + id);
      let resp = await getDoc(productRef);

      return resp.data();
    } else {
      throw new Error('');
    }
  };

  deleteProduct = (id: string, fileName: string) => {
    try {
      let docRef = doc(this.db, this.productColectionName, id);

      deleteDoc(docRef).then((resp) => {
        this.deleteProductImage(fileName);
      });
    } catch (error) {
      console.log('Error on Delete Product:', error);
    }
  };

  deleteProductImage = (imageUrl: string) => {
    let imageRef = ref(this.storage, imageUrl);

    deleteObject(imageRef).then((resp) => {
      console.log('delete ', resp);
    });
  };

  updateProduct = async (id: string, data: object) => {
    try {
      let docRef = doc(this.db, this.productColectionName, id);
      return await updateDoc(docRef, data);
    } catch (error) {
      console.log(error);
    }
  };

  getProductCategory = async () => {
    return [
      {
        name: 'celulares semi novos',
        position: 1,
        display: true,
        icon: 'fa-solid fa-mobile-button ',
        id: 1,
      },
      {
        name: 'celulares novos',
        position: 2,
        display: true,
        icon: 'fa-solid fa-mobile-screen-button ',
        id: 2,
      },
      {
        name: 'tablet',
        position: 3,
        display: true,
        icon: 'fa-solid fa-tablet-screen-button',
        id: 3,
      },
      {
        name: 'receptores',
        position: 4,
        display: true,
        icon: 'fa-solid fa-satellite-dish',
        id: 4,
      },
      {
        name: 'drones',
        position: 5,
        display: true,
        icon: 'fa-solid fa-play',
        id: 5,
      },
      {
        name: 'relógios novos',
        position: 6,
        display: true,
        icon: 'fa-solid fa-clock',
        id: 6,
      },
      {
        name: 'relógios semi novos',
        position: 7,
        display: true,
        icon: 'fa-solid fa-clock',
        id: 7,
      },
      {
        name: 'caixas de som',
        position: 8,
        display: true,
        icon: 'fa-solid fa-music',
        id: 8,
      },
      {
        name: 'memorias',
        position: 9,
        display: true,
        icon: 'fa-solid fa-sd-card',
        id: 9,
      },
      {
        name: 'desktops',
        position: 10,
        display: true,
        icon: 'fa-solid fa-computer',
        id: 10,
      },
      {
        name: 'notebooks',
        position: 11,
        display: true,
        icon: 'fa-solid fa-laptop',
        id: 11,
      },
      {
        name: 'cabos',
        position: 12,
        display: true,
        icon: 'fa-solid fa-play',
        id: 12,
      },
      {
        name: 'carregadores',
        position: 13,
        display: true,
        icon: 'fa-solid fa-charging-station',
        id: 13,
      },
      {
        name: 'capinhas',
        position: 14,
        display: true,
        icon: 'fa-solid fa-play',
        id: 14,
      },
      {
        name: 'peliculas',
        position: 15,
        display: true,
        icon: 'fa-solid fa-play',
        id: 15,
      },
      {
        name: 'outros',
        position: 16,
        display: true,
        icon: 'fa-solid fa-play',
        id: 16,
      },
    ];
  };

  getPriceTax = async (price: number) => {
    let taxes = [
      { rate: 0, tax: 5 },
      { rate: 500, tax: 8 },
      { rate: 1000, tax: 10 },
      { rate: 1500, tax: 15 },
      { rate: 2000, tax: 20 },
      { rate: 2500, tax: 22 },
      { rate: 3000, tax: 25 },
    ];

    let filterdTaxes = taxes
      .filter((item) => {
        if (item.rate <= price) {
          return true;
        } else {
          return false;
        }
      })
      .reduce((pre: any, actual: any) => {
        pre = [] || pre;
        pre.push(actual.tax);
        return pre;
      }, []);

    return Math.max(...filterdTaxes);
  };
}
