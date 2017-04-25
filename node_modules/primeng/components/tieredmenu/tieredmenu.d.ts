import { ElementRef, AfterViewInit, OnDestroy, Renderer } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/api';
export declare class TieredMenuSub {
    domHandler: DomHandler;
    item: MenuItem;
    root: boolean;
    constructor(domHandler: DomHandler);
    activeItem: Element;
    onItemMouseEnter(event: Event, item: HTMLElement, menuitem: MenuItem): void;
    onItemMouseLeave(event: Event): void;
    itemClick(event: Event, item: MenuItem): boolean;
    listClick(event: Event): void;
}
export declare class TieredMenu implements AfterViewInit, OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer;
    model: MenuItem[];
    popup: boolean;
    style: any;
    styleClass: string;
    container: any;
    documentClickListener: any;
    preventDocumentDefault: any;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer);
    ngAfterViewInit(): void;
    toggle(event: Event): void;
    show(event: Event): void;
    hide(): void;
    unsubscribe(item: any): void;
    ngOnDestroy(): void;
}
export declare class TieredMenuModule {
}
