import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { UserServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'header-user-menu',
  templateUrl: './header-user-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserMenuComponent {
  constructor(
    private _authService: AppAuthService,
    private _userService: UserServiceProxy
  ) {}

  logout(): void {
    this._userService.offlineUser().subscribe((result) => {
      if (result) {
        this._authService.logout();
      }
    });
  }
}
