import { Injectable, ComponentRef, Injector, ApplicationRef, createComponent, EnvironmentInjector } from '@angular/core';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private componentRef!: ComponentRef<ErrorModalComponent>;

  constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector
  ) {}

  showErrorModal(errorMessage: string) {
    this.componentRef = createComponent(ErrorModalComponent, {
      environmentInjector: this.environmentInjector
    });
    this.componentRef.instance.errorMessage = errorMessage;
    this.componentRef.instance.close.subscribe(() => this.closeModal());

    this.appRef.attachView(this.componentRef.hostView);

    const domElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  closeModal() {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }
}
