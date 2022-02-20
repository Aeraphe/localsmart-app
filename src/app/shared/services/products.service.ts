import { Injectable } from '@angular/core';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FirebaseStorageService } from './firebase-storage.service';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

interface Product {
  url?: string,
  file_name?: string,
  category: string,
  name: string,
  price?: number,
  props?: [{ name: string; value: string }],
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private bucketName = 'product-images';
  private db = getFirestore();

  constructor(private storageService: FirebaseStorageService) {}

  uploadProductImage = async (file: File, postData: Product) => {
    let imgRef = ref(
      this.storageService.getStorage(),
      `${this.bucketName}/${file.name}`
    );

    let snapshot = await uploadBytes(imgRef, file);
    let url = await getDownloadURL(snapshot.ref);
    let data: Product = { ...postData, url, file_name: file.name };
    this.handleSaveImageDataOnDb(data);
  };

  private handleSaveImageDataOnDb = async (product: Product) => {
    const docRef = await addDoc(collection(this.db, 'products'), {
      url: product.url,
      category: product?.category || 'phones',
      name: product?.name || 'phones',
      price: product?.price || 0,
      props: product?.props || [],
      fileName: product.file_name,
      data: new Date(),
    });
  };
}
