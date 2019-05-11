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
  public    cleaners:     [ShareModel];

  public share: ShareModel;

  constructor(
    public sharesService: SharesService, 
    public route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.getShares()  
  }

  getShares() {
    this.sharesService.getShares().subscribe(response => {
        this.shares = response;
    });
  }
 
}
