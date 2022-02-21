import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../shared/services/products.service';
import { OveflowBodyService } from '../../../shared/services/oveflow-body.service';
import { OverlayService } from '../../../shared/services/overlay.service';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss'],
})
export class UploadTaskComponent implements OnInit {
  file!: File;

  loaderActive = false;

  uploadForm = new FormGroup({
    file: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    condition: new FormControl(null, [Validators.required]),
    sold: new FormControl(0),
  });

  constructor(
    private productsService: ProductsService,
    private overflowService: OveflowBodyService,
    private OverlayService: OverlayService
  ) {}

  ngOnInit(): void {}

  onSubmit = async () => {
    try {
      this.loaderActive = true;
      this.overflowService.activeOverflowBody();
      this.OverlayService.changeOverlayState(true);
      let formData = this.uploadForm.value;
      let file = formData?.file;
      await this.productsService.uploadProductImage(file, formData);
      this.uploadForm.reset();
      this.loaderActive = false;
      this.overflowService.removeOverflowBody();
      this.OverlayService.changeOverlayState(false);
    } catch (error) {
      console.error(error);
      this.loaderActive = false;
      this.overflowService.removeOverflowBody();
      this.OverlayService.changeOverlayState(false);
      throw new Error('File upload Error');
    }
  };

  onFileChange(event: Event) {
    try {
      let target = event.target as HTMLInputElement;
      if (target.files) {
        const file = target.files[0];
        this.uploadForm.patchValue({ file });
      }
    } catch (error) {}
  }
}
