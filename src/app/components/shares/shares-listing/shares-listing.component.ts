import { CurrentSharePrice } from "./../../../models/current-share-price";
import { SharesService } from "../shares.service";
import { Share } from "./../../../models/share";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { Subscription, timer, pipe } from 'rxjs'
import 'rxjs/Rx';

@Component({
  selector: "app-shares-listing",
  templateUrl: "./shares-listing.component.html",
  styleUrls: ["./shares-listing.component.css"]
})

export class SharesListingComponent implements OnInit {
  shares: Share[];
  currentSharePrice: CurrentSharePrice;
  selectedShare:Share;
  share: Share;
  currentPrice: CurrentSharePrice;
  enteredShares: number = 0;
  form: FormGroup;
  subscription: Subscription;
  statusText: string;
  value: string = '';
  remainder: number = 0;
  remain: any;
  
  constructor(
    public sharesService: SharesService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getShares();
    this.getCurrentSharePrice();
  
    this.form = new FormGroup({
      sellShares: new FormControl(''),
    });
    // this.subscription = timer(0, 10000).pipe(
    //   switchMap(() => this.sharesService.currentSharePrice())
    // ).subscribe(result => this.currentSharePrice = result);
  }
  // onSubmit (){
  //   this.enteredShares = this.form.value;
  //   console.log("The on submit triggers: "+  this.enteredShares)
  //   this.calculateSellShares();
  // }
  submit() {
    console.log(this.form);
    let numberOfShares = this.form.value.numberOfShares;
    let sellShares = this.form.value.sellShares;

    console.log("The number of shares entered was "+numberOfShares);
    console.log("The number of sellShares entered was "+sellShares);

  }


  calculatesellShares() {
    console.warn("calculatesellShares WARNING"+this.form.value.sellShares);
    return this.form.value.sellShares;
  } 
  calculateShares() {
    return ((this.form.value.calculationShares * this.sellShares))
    
  }
  // onEnter() { 
  //   this.value = this.value; 
  //   console.warn( this.value);
  // }

  getCurrentSharePrice() {
    this.sharesService.currentSharePrice().subscribe(response => {
      this.currentSharePrice = response;
    });

  }
  selectShares() {
    console.log("selectShares() triggered");
  }
  onSelect(share: Share): void {
    this.selectedShare = share;
    // if(this.selectedShare.numberOfShares <= this.sellShares)
    // selectedShare.numberOfShares
    this.form.get('sellShares');
    this. calculateSellShares();
  }
  calculateSellShares() {
    const remain = this.enteredShares -  this.selectedShare.numberOfShares;
    // if(this.enteredShares <=  this.selectedShare.numberOfShares){
    //   this.remainder = (this.selectedShare.numberOfShares - this.enteredShares);
    //   console.warn("Your deduction is:" + this.remainder + this.enteredShares + this.selectedShare.numberOfShares);
    // }else{
      console.warn("This is this calculateSelllSharesfunction" +this.enteredShares);
  }

  getShares() {
    this.sharesService.getShares().subscribe(response => {
      this.shares = response;
    });
  }
  RowSelected(share:any){
    this.selectedShare = share;  
    console.log("You selected a row"+this.selectedShare) // declare variable in component.
    }

}
