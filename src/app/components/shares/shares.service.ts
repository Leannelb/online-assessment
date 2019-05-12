import { ShareResponse } from './../../responses/ShareResponse';
import { CurrentSharePrice } from './../../models/current-share-price';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Share } from 'src/app/models/share';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharesService {

  public shares: Observable<[Share]>;
  share: Share;
  public csp: Observable<[Share]>;
  private URL = 'http://developerexam.equityplansdemo.com/test/sampledata';
  private cspURL = 'http://developerexam.equityplansdemo.com/test/fmv';
  private postURL = 'https://webhook.site';

  constructor(private http: HttpClient) { }

  public getShares() {
    return this.http.get<[Share]>(this.URL);
  }

  public currentSharePrice() {
    return this.http.get<CurrentSharePrice>(this.cspURL);
  }

  addShare(share: Share, post) {
    return this.http.post<ShareResponse>(this.postURL, post);
  }

}
