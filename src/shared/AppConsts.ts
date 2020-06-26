import { EventEmitter } from '@angular/core';

export class AppConsts {
  static remoteServiceBaseUrl: string;
  static appBaseUrl: string;
  static appBaseHref: string; // returns angular's base-href parameter value if used during the publish

  static localeMappings: any = [];
  static connection: any;

    static messageReceived:  EventEmitter<any>;
    static boardReceived:  EventEmitter<any>;

  static readonly userManagement = {
    defaultAdminUserName: 'admin',
  };

  static readonly localization = {
    defaultLocalizationSourceName: 'Karmeez',
  };

  static readonly authorization = {
    encryptedAuthTokenName: 'enc_auth_token',
  };
}
