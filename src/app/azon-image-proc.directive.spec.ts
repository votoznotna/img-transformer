import { AzonImageProcDirective } from './azon-image-proc.directive';
import { ElementRef } from '@angular/core';


describe('AzonImageProcDirective', () => {
  it('should create an instance', () => {
    const element: ElementRef = {nativeElement: {}};
    const directive = new AzonImageProcDirective(element);
    expect(directive).toBeTruthy();
  });
});
