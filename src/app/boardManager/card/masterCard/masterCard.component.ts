import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SharedService } from '../../../../shared/shared.service';
import { ListenerService } from '../../../../shared/listener.service';

import { Subscription } from 'rxjs';
import { appModuleAnimation } from '../../../../shared/animations/routerTransition';
import {
  BoardDto,
  MasterCardDto,
  MasterCardServiceProxy,
} from '../../../../shared/service-proxies/service-proxies';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-masterCard',
  templateUrl: './masterCard.component.html',
  styleUrls: ['./masterCard.component.css'],
  animations: [appModuleAnimation()],
})
export class MasterCardComponent implements OnInit, OnDestroy {
  masterCardDto = new MasterCardDto();
  masterCardDtos: MasterCardDto[] = [];
  isNewCard = false;

  @Input() boradDto: BoardDto;
  private ngUnsubscribe: Subscription;
  constructor(
    private _listenerService: ListenerService,
    private readonly _masterCardService: MasterCardServiceProxy
  ) {}
  ngOnInit() {
    this.getMasterCard();
  }

  ngOnDestroy() {}

  getMasterCard() {
    this._masterCardService
      .getMasterCard(this.boradDto.id)
      .subscribe((result) => {
        this.masterCardDtos = result;
      });
  }
  createMasterCard() {
    this.masterCardDto.boardId = this.boradDto.id;
    this._masterCardService.create(this.masterCardDto).subscribe(() => {
      abp.notify.success('ثبت انجام شد');
      this.getMasterCard();
    });
  }

  updateMasterCard(masterCard) {
    this._masterCardService.update(masterCard).subscribe(() => {
      abp.notify.success('ثبت انجام شد');
      masterCard.isEditCard = false;
      this.getMasterCard();
    });
  }
}
