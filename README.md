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

1. Have Git installed (https://git-scm.com/downloads).
2. Have Node installed (https://nodejs.org/en/download/).
3. Run the following command from where is planning to have the project installed: 
   'git clone git@github.com:votoznotna/img-transformer.git'.
4. Go to root project folder and run 'npm install'.
5. From the same folder run 'npm start'.
6. Navigate http://localhost:4200/ in browser and enjoy the run.


