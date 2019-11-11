# Overall

The project is targeted for demo of using Angular 8 directive for unobtrusive image transformation

```
*
* Usage:
* <img ... [matAzonImageProc]="matAzonImageProcData" (srcChange)="onImgSrcChange($event)">
* whereas matAzonImageProcData is json object of inputs in with the following keys:
* grayScale: [true/false], false is by default - converts image to 100% gray color;
* invert: [true/false], false is by default - inverts the colors of the image;
* flip: [true/false], false is by default - flips the image horizontally;
* (srcChange) is a callback for caller component to get new created <img> src value.
*
```

## Getting Started

* Have [Git](https://git-scm.com/downloads) installed.
* Have [Node](https://git-scm.com/downloads) installed. 
* Run the following command from where is planning to have the project installed: 
```
git clone git@github.com:votoznotna/img-transformer.git
```
* Go the project's root folder and run
```
npm install
```
* From the same folder run
```
npm start
``` 
* Navigate http://localhost:4200/ in browser and enjoy the run.



