import { Component, OnInit, SimpleChanges } from '@angular/core';
import { IAzonImageProc } from './azon-image-proc.directive';

@Component({
  selector: 'mat-azon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'instrumental';
  imgGrayScale = false;
  imgInvert = false;
  imgFlip = false;
  imagePath: string;
  imgURL: string;
  message: string;
  initMatAzonImageProcData: IAzonImageProc = {
    grayScale: false,
    invert: false,
    flip: false
  };
  // actual data for binding with directive
  matAzonImageProcData: IAzonImageProc = {...this.initMatAzonImageProcData};
  // settings of the image transformations before applying to <img> component
  prepMatAzonImagePropData: IAzonImageProc = {...this.initMatAzonImageProcData};
  lastLoadedImgURL: string;

  ngOnInit(): void {
    this.ImageProcDataUpdate();
  }

  onApply() {
    this.ImageProcDataUpdate();
  }

  onReset() {
    this.imgURL = this.lastLoadedImgURL;
    this.imgGrayScale = this.initMatAzonImageProcData.grayScale;
    this.imgInvert = this.initMatAzonImageProcData.invert;
    this.imgFlip = this.initMatAzonImageProcData.flip;
    this.prepMatAzonImagePropData = {...this.initMatAzonImageProcData};
  }

  ImageProcDataUpdate() {
    this.matAzonImageProcData = {...this.prepMatAzonImagePropData};
  }

  PrepImageProcDataUpdate() {
    this.prepMatAzonImagePropData = {
      grayScale: this.imgGrayScale,
      invert: this.imgInvert,
      flip: this.imgFlip
    };
  }

  inputsChanged(newObj: any) {
    this.PrepImageProcDataUpdate();
  }

  onImgSrcChange(newSrc: string) {
    this.imgURL = newSrc;
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = `Only images are supported.`;
        return;
      }
      const reader = new FileReader();
      this.imagePath = event.target.files;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.imgURL = reader.result as string;
        this.lastLoadedImgURL = this.imgURL;
      };
    }
  }
}
