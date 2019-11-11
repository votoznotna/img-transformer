import { Directive, ElementRef, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

export interface IAzonImageProc {
  grayScale: boolean;
  invert: boolean;
  flip: boolean;
}

/*
* Usage:
* <img ... [matAzonImageProc]="matAzonImageProcData" (srcChange)="onImgSrcChange($event)">
* whereas matAzonImageProcData is json object of inputs in with the following keys:
* grayScale: [true/false], false is by default - converts image to 100% gray color;
* invert: [true/false], false is by default - inverts the colors of the image;
* flip: [true/false], false is by default - flips the image horizontally;
* (srcChange) is a callback for caller component to get new created <img> src value.
*
*/

@Directive({
  selector: '[matAzonImageProc]'
})
export class AzonImageProcDirective  implements OnChanges {

  @Input('matAzonImageProc') imageProgData: IAzonImageProc;
  // callback to notify parental component about 'src' update
  @Output() srcChange = new EventEmitter<string>();
  newImageProgInputs: IAzonImageProc;
  domElement: any;
  canvas: any;
  mimeType: string;

  constructor(private el: ElementRef) {
    this.domElement = el.nativeElement;
    this.convertImageToCanvas();
  }

  updateImageTransformations() {

    if (!this.domElement.src) {
      return;
    }

    this.newImageProgInputs = this.imageProgData || {
      grayScale: false,
      invert: false,
      flip: false
    };

    // Gray scale tranformation
    if (this.newImageProgInputs.grayScale) {
      this.grayscaleImage();
    }

    // Invert colors tranformation
    if (this.newImageProgInputs.invert) {
      this.invertImage();
    }

    // Horizontal flip tranformation
    if (this.newImageProgInputs.flip) {
      this.flipImage();
    }

    this.convertCanvasToImage();
  }

  invertImage() {
    if (!this.canvas) {
      return;
    }
    const context = this.canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    context.putImageData(imageData, 0, 0);
  }

  grayscaleImage() {
    if (!this.canvas) {
      return;
    }
    const context = this.canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }
    context.putImageData(imageData, 0, 0);
  }

  flipImage() {
    if (!this.canvas) {
      return;
    }
    const context = this.canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < imageData.height; i++) {
      for (let j = 0; j < imageData.width / 2; j++) {
        const index = (i * 4) * imageData.width + (j * 4);
        const mirrorIndex = ((i + 1) * 4) * imageData.width - ((j + 1) * 4);
        for (let p = 0; p < 4; p++) {
          const temp = imageData.data[index + p];
          imageData.data[index + p] = imageData.data[mirrorIndex + p];
          imageData.data[mirrorIndex + p] = temp;
        }
      }
    }
    context.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
  }

  convertImageToCanvas() {
    if (!this.domElement.src) {
      return;
    }
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.domElement.width;
    this.canvas.height = this.domElement.height;
    this.canvas.getContext('2d').drawImage(this.domElement, 0, 0);
    this.mimeType = this.domElement.src.split(';')[0].split(':')[1];
  }

  convertCanvasToImage() {
    if (!this.canvas) {
      return;
    }
    const image = new Image();
    image.src = this.canvas.toDataURL(this.mimeType);
    this.domElement.src = image.src;

    setTimeout(() =>  this.srcChange.emit(this.domElement.src), 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.convertImageToCanvas();
    this.updateImageTransformations();
  }

}
