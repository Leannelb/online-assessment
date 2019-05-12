import { CurrentSharePrice } from "./../../../models/current-share-price";
import { SharesService } from "../shares.service";
import { Share } from "./../../../models/share";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import "rxjs/Rx";

@Component({
  selector: "app-shares-listing",
  templateUrl: "./shares-listing.component.html",
  styleUrls: ["./shares-listing.component.css"]
})
export class SharesListingComponent implements OnInit {
  shares: Share[];
  currentSharePrice: CurrentSharePrice;
  selectedShare: Share;
  share: Share;
  currentPrice: CurrentSharePrice;
  enteredShares: number = 0;
  form: FormGroup;
  subscription: Subscription;
  statusText: string;
  value: string = "";
  remainder: number = 0;
  remain: any;
  numberOfShares: number;
  sellShares: number;

  constructor(
    public sharesService: SharesService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getShares();
    this.getCurrentSharePrice();

    this.form = new FormGroup({
      sellShares: new FormControl(""),
      numberOfShares: new FormControl("")
    });
    // this.subscription = timer(0, 10000).pipe(
    //   switchMap(() => this.sharesService.currentSharePrice())
    // ).subscribe(result => this.currentSharePrice = result);
  }
  
  submit() {
    let numberOfShares = this.form.value.numberOfShares;
    let sellShares = this.form.value.sellShares;

    if (
      numberOfShares > sellShares &&
      (numberOfShares / 50) * 100 >= (sellShares / 50) * 100
    ) {
      let result = numberOfShares - sellShares;
      alert("Shares exceed 50% sale. " +  "\r\n Current Shares: "+ numberOfShares +   "\r\n - Shares to Sell: "+ sellShares +  "\r\n Final shares: " + result);
    } else if (
      numberOfShares > sellShares &&
      (numberOfShares / 100) * 50 <= (sellShares / 100) * 50
    ) {
      let result = numberOfShares - sellShares;
      alert("Shares are below 50% sale. Final shares: " + result);
    } else if (numberOfShares <= sellShares) {
      alert("you do not have enough shares");
    }
  }
  calculatesellShares() {
    return this.form.value.sellShares;
  }

  getCurrentSharePrice() {
    this.sharesService.currentSharePrice().subscribe(response => {
      this.currentSharePrice = response;
    });
  }

  calculateSellShares() {
    return this.form.value.sellShares;
  }

  getShares() {
    this.sharesService.getShares().subscribe(response => {
      this.shares = response;
    });
  }

  RowSelected(share: any) {
    this.selectedShare = share;
    console.log("You selected a row" + this.selectedShare); // declare variable in component.
  }
}
