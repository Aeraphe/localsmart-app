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
  updateDoc,
  getDoc,
  FieldPath,
  Query,
} from 'firebase/firestore';
import { Product } from 'src/app/interfaces/product';

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
        category: product?.category || 'phones',
        name: product?.name || 'phones',
        price: product?.price || 0,
        props: product?.props || [],
        fileName: newFileName,
        originalFileName: product.file_name,
        sold: product.sold,
        condition: product.condition,
        payment_method: product.payment_method,
        promo: product.promo,
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
}
