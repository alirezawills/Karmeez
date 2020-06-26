import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {
  UserServiceProxy,
  ConfirmUserDto,
  UserDto,
  ConfirmUserServiceProxy,
} from '@shared/service-proxies/service-proxies';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-acceptUser',
  templateUrl: './acceptUser.component.html',
  styleUrls: ['./acceptUser.component.css'],
})
export class AcceptUserComponent implements OnInit {
  saving = false;
  @Output() sendAccept = new EventEmitter<any>();
  model = new UserDto();
  userNameOrEmail: string;
  id: number;
  isUserFinde = false;

  constructor(
    public bsModalRef: BsModalRef,
    private _userService: UserServiceProxy,
    private _confirmUser: ConfirmUserServiceProxy
  ) {}

  ngOnInit() {}
  searchUser() {
    this._userService
      .getUserByUserNameOrEmail(this.userNameOrEmail)
      .subscribe((result) => {
        this.model = result;
        // tslint:disable-next-line: triple-equals
        if (this.model.id == undefined || this.model.id < 1) {
          this.isUserFinde = false;
          abp.notify.warn('کاربری پیدا نشد ');
          return;
        }
        this.isUserFinde = true;
      });
  }

  saveConfirm() {
    const confirmUser = new ConfirmUserDto();
    confirmUser.seen = false;
    confirmUser.userIdRecive = this.model.id;
    confirmUser.accept = false;
    confirmUser.boardId = this.id;
    this._confirmUser.create(confirmUser).subscribe((result) => {
      this.isUserFinde = false;
      this.bsModalRef.hide();
    });
  }
}
