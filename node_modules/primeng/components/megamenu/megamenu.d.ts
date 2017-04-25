import { ElementRef, OnDestroy, Renderer } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/api';
export declare class MegaMenu implements OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer;
    model: MenuItem[];
    style: any;
    styleClass: string;
    orientation: string;
    activeItem: any;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer);
    onItemMouseEnter(event: any, item: any, menuitem: MenuItem): void;
    onItemMouseLeave(event: any, link: any): void;
    itemClick(event: any, item: MenuItem): void;
    unsubscribe(item: any): void;
    ngOnDestroy(): void;
    getColumnClass(menuitem: MenuItem): any;
}
export declare class MegaMenuModule {
}
