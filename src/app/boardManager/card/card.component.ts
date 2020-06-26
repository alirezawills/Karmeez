import { Component, OnInit, OnDestroy } from '@angular/core';
import { BoardDto } from '@shared/service-proxies/service-proxies';
import { Subscription } from 'rxjs';
import { ListenerService } from '@shared/listener.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnDestroy {
  boardDto = new BoardDto();
  private ngUnsubscribe: Subscription;
  constructor(private _listenerService: ListenerService) {}
  ngOnDestroy(): void {
   // this.ngUnsubscribe.unsubscribe();
  }

  ngOnInit() {
this.boardDto = JSON.parse( sessionStorage.getItem('board'));
    // this.ngUnsubscribe = this._listenerService.getValue().subscribe((next) => {
    //   this.boardDto = next;
    // });
  }
}
