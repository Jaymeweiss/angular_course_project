import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  constructor(private elementReference: ElementRef) {
  }

  @HostListener('document:click', ['$event']) onClick(event: Event): void {
    this.isOpen = this.elementReference.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
}
