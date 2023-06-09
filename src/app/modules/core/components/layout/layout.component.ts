import { Component } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { CartService } from '../../../home/services/cart-service';
import {Product} from "../../../../models/product";
import {WebSocketAPI} from "../../../login/components/greeting-message/WebSocketAPI";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  constructor(private tokenService: TokenService, private router: Router,
              private cartService: CartService) {}

  public logout() {
    this.tokenService.logout();
    this.cartService.removeAll();
    this.tokenService.disconnect();
  }

  public toCategory(type:String){
    this.router.navigate([`category/${type}`]);
  }

  public greetingMessage(){
    this.tokenService.sendMessage(this.tokenService.getUsername());
  }

  public toAddProduct(){
    this.router.navigate(["add-product"]);
  }

  public viewOrders(){
    this.router.navigate(["app-view-order"]);
  }

  public isLoggedIn(){
    return this.tokenService.getUsername() != null;
  }

  public returnUsernameLoggedIn() {
    let username = this.tokenService.getUsername();
    // @ts-ignore
    return username?.charAt(0).toUpperCase() + username?.substring(1);
  }

  public isAdmin(){
    let token = this.tokenService.getDecodedAccessToken(this.tokenService.getAccessToken()!);
    let responseMap = new Map(Object.entries(token));
    let roles = responseMap.get("roles") as string;
    return roles.indexOf("ROLE_ADMIN") != -1;
  }

  public goHome(){
    this.router.navigate(["/"]);
  }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

  openCart(){
    //go to cart details
    this.router.navigate(["/cart-details"]);
  }

  openFavoriteProducts() {
    this.router.navigate(["/favorite"]);
  }
}
