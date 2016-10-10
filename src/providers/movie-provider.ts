import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class MovieProvider {

  private base_url = "https://yts.ag/api/v2/";

  constructor(public http: Http) {}

  list(){
    let params = new URLSearchParams();
    return this.search(params);
  }

  search(data: URLSearchParams){
    let url = this.base_url + "list_movies.json";

    return this.http.get(url, { search: data } )
      .map(res=> res.json())
      .toPromise();
  }
}
