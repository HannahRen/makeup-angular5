import { Injectable, EventEmitter } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ProductService {

  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter()

  constructor(private http: Http) { }

  getAllCategories(): string[] {
    return ['Foundation', 'Eyelinear', 'Mascara', 'Eyeshadow', 'Concealer', 'Lipstick']
  }

  getProducts() : Observable<Product[]> {
    return this.http.get("/api/products").map(res => res.json())
  }
  getProduct(id: number) : Observable<Product> {
    return this.http.get("/api/products/" + id ).map(res => res.json())
  }
  getCommentsForProductId(productId: number) : Observable<Comment[]> {
    return this.http.get("/api/products/" + productId + "/comments").map(res => res.json())
  }
  search(params: ProductSearchParams) {
    return this.http.get("/api/products", {search: this.encodeParams(params)}).map(res => res.json())
  }
  private encodeParams(params: ProductSearchParams) {
    let result: URLSearchParams
    result = Object.keys(params)
               .filter(key => params[key])
               .reduce((sum: URLSearchParams, key: string) => {
                 sum.append(key, params[key])
                 return sum
               }, new URLSearchParams())
    console.log(result)
    return result
  }
}

export class ProductSearchParams {
  constructor(
    public title: string,
    public price: number,
    public category: string
  ) { }
}

export class Product {
  constructor(
    public id: number,
    public title: string,
    public avatar: string,
    public price: number,
    public rating: number,
    public desc: string,
    public category: string,
    public isLove: boolean
  ) { }
}

export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public user: string,
    public rating: number,
    public content: string
  ) { }
}
