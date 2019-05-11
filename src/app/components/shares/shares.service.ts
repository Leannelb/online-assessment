import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShareModel } from 'src/app/models/share';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharesService {

  public shares: Observable<[ShareModel]>;
  private URL = 'http://developerexam.equityplansdemo.com/test/sampledata';

  constructor(private http: HttpClient) { }

  public getShares() {
    return this.http.get<[ShareModel]>(this.URL);
  }

  // public currentSharePrice() { 
  //   return this.
  // }
}
