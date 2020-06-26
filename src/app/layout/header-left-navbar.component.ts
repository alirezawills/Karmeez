import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { LayoutStoreService } from '@shared/layout/layout-store.service';
import {
  ConfirmUserServiceProxy,
  ConfirmUserDto,
  BoardServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { RefreshTokenService } from 'abp-ng2-module';
import { ListenerService } from '@shared/listener.service';

@Component({
  selector: 'header-left-navbar',
  templateUrl: './header-left-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderLeftNavbarComponent implements OnInit {
  sidebarExpanded: boolean;
  countMessage: any;
  confirmUsers: any = {};
  @Output() loadBoard = new EventEmitter<any>();

  constructor(
    private _layoutStore: LayoutStoreService,
    private _confirmUser: ConfirmUserServiceProxy,
    private _boardService: BoardServiceProxy,
    private _listenerService: ListenerService
  ) {}

  ngOnInit(): void {
    this._layoutStore.sidebarExpanded.subscribe((value) => {
      this.sidebarExpanded = value;
    });
    this.getMessage();
  }

  toggleSidebar(): void {
    this._layoutStore.setSidebarExpanded(!this.sidebarExpanded);
  }

  getMessage() {
    this._confirmUser.getAllAccept().subscribe((result) => {
      this.confirmUsers = result;
      this.countMessage = result.length;
      if (this.countMessage > 0) {
        const element = document.getElementById('dropDownMessage') as HTMLElement;
        element.click();
      }
    });
  }
  acceptConfirm(model) {
    model.seen = true;
    model.accept = true;
    this._confirmUser.update(model).subscribe(() => {
      this.getMessage();
    //  this._listenerService.listener();
    this._listenerService.loadMethod.next();
    });
  }
  seenConfirm(model) {
    model.seen = true;
    model.accept = false;
    this._confirmUser.update(model).subscribe(() => {
      this.getMessage();
      // this.loadBoard.emit();
     // this._listenerService.listener();
    });
  }
}
