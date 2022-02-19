import { Injectable } from '@angular/core';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FirebaseStorageService } from './firebase-storage.service';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private bucketName = 'product-images';
  private db = getFirestore();

  constructor(private storageService: FirebaseStorageService) {}

  uploadProductImage = async (file: File, postData: any) => {
    let imgRef = ref(
      this.storageService.getStorage(),
      `${this.bucketName}/${file.name}`
    );

    let snapshot = await uploadBytes(imgRef, file);
    let url = await getDownloadURL(snapshot.ref);
    this.handleSaveImageDataOnDb(postData, url, file.name);
  };

  private handleSaveImageDataOnDb = async (
    postData: any,
    url: string,
    fileName: string
  ) => {
    const docRef = await addDoc(collection(this.db, 'products'), {
      url,
      category: postData?.category || 'phones',
      name: postData?.name || 'phones',
      price: postData?.price || 0,
      props: postData?.props || [],
      fileName,
      data: new Date(),
    });
  };
}
