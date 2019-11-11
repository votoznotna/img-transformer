# Overall

The project is targeted for demo of using angular 8 directive for image transformation

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

## How to run

Have git installed (https://git-scm.com/downloads) 
Have Node installed (https://nodejs.org/en/download/)
Run the following commands: git clone 
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


