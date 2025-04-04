import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appButton]',
  standalone: true
})
export class AppButton implements AfterViewInit {
  @Input() appButton = "";
  @Input() name = "";
  @Input() src = "";
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {

  }
  ngAfterViewInit(): void {
    let iconHtml = '';
    if (this.name) {
      iconHtml = `<ion-icon name="${this.name}"></ion-icon>`;
    } else if (this.src) {
      iconHtml = `<ion-icon src="${this.src}"></ion-icon>`;
    }
    let html = `<div class="btn-text">${this.appButton}</div>${iconHtml}`
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', html);
  }
}

@Directive({
  selector: '[stepTitle]',
  standalone: true
})
export class StepItem implements AfterViewInit {
  @Input() count = "";
  @Input() stepTitle = "";
  __status = "";
  @Input() set status(status: string) { this.__status = status; this.init(); }
  get status() { return this.__status; }
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {

  }
  ngAfterViewInit(): void {
    this.init();
  }

  init() {
    let statusString = this.__status.replace('-', ' ');
    statusString === '' ? statusString = 'Not Started' : '';
    let html = `
      <div class="step-count">${this.count}</div>
      <div class="step-text">
        <div class="step-title">${this.stepTitle}</div>
        <div class="step-status">${statusString}</div>
      </div>
    `;
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', html);
    if (this.__status !== '') {
      // remove all the class in el
      this.el.nativeElement.classList.remove(...this.el.nativeElement.classList);
      this.renderer.addClass(this.el.nativeElement, this.__status);
    }
  }
}

@Directive({
  selector: '[appDynamicLink]',
  standalone: true,
})
export class DynamicLink implements AfterViewInit {
  @Input() linkText = '';
  @Input() linkUrl = '';
  @Input() elementType = 'a';
  @Input() target = '_blank';
  @Input() customStyles: any = {};
  @Input() customClasses: string[] = [];
  @Input() clickCallback: () => void = () => { };

  private createdElement?: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.createElement();
  }

  private createElement(): void {
    this.createdElement = this.renderer.createElement(this.elementType);

    const contentNode = this.renderer.createText(this.linkText);
    this.renderer.appendChild(this.createdElement, contentNode);

    if (this.elementType === 'a' && this.linkUrl) {
      this.renderer.setAttribute(this.createdElement, 'href', this.linkUrl);
      this.renderer.setAttribute(this.createdElement, 'rel', 'noopener noreferrer');

      if (this.target) {
        this.renderer.setAttribute(this.createdElement, 'target', this.target);
      }
    }

    Object.entries(this.customStyles).forEach(([key, value]) =>
      this.renderer.setStyle(this.createdElement, key, value)
    );

    this.customClasses.forEach((className) =>
      this.renderer.addClass(this.createdElement, className)
    );

    this.renderer.appendChild(this.el.nativeElement, this.createdElement);

    if (this.clickCallback) {
      this.renderer.listen(this.createdElement, 'click', this.clickCallback);
    }
  }

  removeElement(): void {
    if (this.createdElement) {
      this.renderer.removeChild(this.el.nativeElement, this.createdElement);
      this.createdElement = undefined;
    }
  }

  ngOnDestroy(): void {
    // this.removeElement();
  }
}

@Directive({
  selector: '[hoverHighlight]',
  standalone: true,
})
export class HoverHighlightDirective {
  @Input('hoverHighlight') highlightColor = 'yellow';
  @Input() defaultColor = 'transparent';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.changeColor(this.highlightColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeColor(this.defaultColor);
  }

  private changeColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }
}

@Directive({
  selector: '[delayFor]',
  standalone: true,
})
export class DelayForDirective<T> {
  @Input() set delayForOf(items: T[]) {
    this.vcr.clear();
    if (items && items.length) {
      this.renderItems(items);
    }
  }

  @Input() delayForDelay = 500;

  constructor(
    private templateRef: TemplateRef<any>,
    private vcr: ViewContainerRef
  ) { }

  private async renderItems(items: any[]) {
    for (const item of items) {
      this.vcr.createEmbeddedView(this.templateRef, { $implicit: item });
      await new Promise((resolve) => setTimeout(resolve, this.delayForDelay));
    }
  }
}