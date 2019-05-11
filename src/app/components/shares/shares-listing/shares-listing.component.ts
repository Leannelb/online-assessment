import { CurrentSharePrice } from './../../../models/current-share-price';
import { SharesService } from '../shares.service';
import { ShareModel } from './../../../models/share';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shares-listing',
  templateUrl: './shares-listing.component.html',
  styleUrls: ['./shares-listing.component.css']
})
export class SharesListingComponent implements OnInit {

  public shares: ShareModel[];
  public currentSharePrice: CurrentSharePrice[];

  public share: ShareModel;
  public currentPrice: CurrentSharePrice;

  constructor(
    public sharesService: SharesService, 
    public route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.getShares();
    this.getCurrentSharePrice();
  }

  getCurrentSharePrice() {
    this.sharesService.currentSharePrice().subscribe(response => {
        this.currentSharePrice = response;
    });
  }

  getShares() {
    this.sharesService.getShares().subscribe(response => {
        this.shares = response;
    });

  }
 
}
