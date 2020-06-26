import { Component, OnInit } from '@angular/core';
import {
  BoardServiceProxy,
  BoardDto,
} from '../../../shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ChatService } from '@app/signalRChat/chat.service';
import { AppConsts } from '@shared/AppConsts';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AcceptUserComponent } from './acceptUser/acceptUser.component';
import { HeaderLeftNavbarComponent } from '@app/layout/header-left-navbar.component';
import { ListenerService } from '@shared/listener.service';
import { SharedService } from '@shared/shared.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  animations: [appModuleAnimation()],
})
export class BoardComponent implements OnInit {
  boardsDto: BoardDto[] = [];
  board = new BoardDto();
  isUpdateBoard = false;
  constructor(
    private _boardService: BoardServiceProxy,
    // private _chatService: ChatService,
    private _router: Router,
    private _modalService: BsModalService,
    private _listenerService: ListenerService,
    private _sharedService: SharedService
  ) {
    //   if (AppConsts.boardReceived != undefined) {
    //     AppConsts.boardReceived.subscribe(() => {
    //      this.getall();
    //     });
    // }

    // _listenerService.listen().subscribe(() => {
    //   this.getall();
    // });
    _listenerService.loadMethod.subscribe(() => {
      this.getall();
    });
  }

  ngOnInit() {
    this.getall();
  }
  getall() {
    this._boardService.getBoardByUserId().subscribe((next) => {
      this.boardsDto = next;
    });
  }

  createBoard() {
    // tslint:disable-next-line: triple-equals
    if (this.board.nameBoard == undefined || this.board.nameBoard == '') {
      abp.notify.error('نام باید ثبت شود');
      return null;
    }
    if (!this.isUpdateBoard) {
      this.board.color = this.getRandomColor();
      this._boardService.create(this.board).subscribe((next) => {
        abp.notify.success('ثبت بدرستی انجام شد');
        // this._chatService.getAllBoard();
        this.board = new BoardDto();
        this.getall();
        return;
      });
    } else {
      this.isUpdateBoard = false;
      this.editBoard(this.board);

      return;
    }
  }
  deleteBoard(model) {
    abp.message.confirm('حذف میز کار', 'آیا مطمئن هستید', (result: boolean) => {
      if (result) {
        this._boardService.delete(model).subscribe(() => {
          this.getall();
        });
      }
    });
  }
  updateMode(boardId, nameBoard, value) {
    this.isUpdateBoard = !value;
    this.board.nameBoard = nameBoard;
    this.board.id = boardId;
  }
  editBoard(model) {
    this._boardService.update(model).subscribe(() => {
      this.board = new BoardDto();
      this.getall();
    });
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#'; // <-----------
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  goToCardPage(board) {
    //this._listenerService.setValue(board);
    sessionStorage.setItem('board',JSON.stringify(board));
    this._router.navigate(['app/card']);
  }

  acceptUser(id): void {
    let acceptUserModal: BsModalRef;

    acceptUserModal = this._modalService.show(AcceptUserComponent, {
      class: 'modal-sm',
      initialState: {
        id: id,
      },
    });

    acceptUserModal.content.sendAccept.subscribe(() => {
      // this.refresh();
    });
  }
}
