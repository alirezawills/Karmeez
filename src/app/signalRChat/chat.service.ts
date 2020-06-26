import { Injectable, EventEmitter } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
const messageReceived = new EventEmitter<any>();
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor() {}

  startConnection() {
    AppConsts.messageReceived = new EventEmitter<any>();
    AppConsts.boardReceived=new EventEmitter<any>();
    jQuery
      .getScript(
        AppConsts.appBaseUrl + '/assets/abp/abp.signalr-client.js',
        () => {
          abp.signalr.startConnection('/signalr-chathub', function (
            connection
          ) {
            AppConsts.connection = connection; // Save a reference to the hub
            connection.on('getMessage', function (message) {
              // Register for incoming messages

              AppConsts.messageReceived.emit(message);
            });
            connection.on('allBoard', function () {
              // Register for incoming messages

              AppConsts.boardReceived.emit();
            });
          });
        }
      )
      .then(function () {
        // AppConsts.messageReceived=messageReceived;
      });
  }

  sendMessage() {
    // Register for connect event
    AppConsts.connection.invoke(
      'sendMessage',
      'Hi everybody, I\'m connected to the chat!'
    );
    console.log('ارسال پیام'); // Send a message to the server
  }
  getAllBoard() {
    // Register for connect event
    AppConsts.connection.invoke(
      'getAllBoard'

    );
    console.log('ارسال board'); // Send a message to the server
  }
  getMessage() {}
}
