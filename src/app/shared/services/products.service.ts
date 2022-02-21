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
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';

interface Product {
  url?: string;
  file_name?: string;
  category: string;
  name: string;
  price?: number;
  props?: [{ name: string; value: string }];
  sold?: number;
  condition?: number;
}

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
    const docRef = await addDoc(
      collection(this.db, this.productColectionName),
      {
        url: product.url,
        category: product?.category || 'phones',
        name: product?.name || 'phones',
        price: product?.price || 0,
        props: product?.props || [],
        fileName: product.file_name,
        sold: product.sold,
        condition: product.condition,
        data: new Date(),
      }
    );
  };

  getProducts = async () => {
    let products: any = [];
    let querySnapshot = await getDocs(
      collection(this.db, this.productColectionName)
    );

    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id });
    });

    return products;
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
}
