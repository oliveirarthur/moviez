import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { URLSearchParams } from '@angular/http';
import { MovieProvider } from '../../providers/movie-provider'
import { DetailsPage } from '../details/details';
import { DownloadProvider } from '../../providers/download-provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private query:String;
  private page = 0;
  private limit = 10;

  private movies:Array<any>;
  private moviesFirstLoad:Array<any>;

  constructor(
    public navCtrl: NavController,
    public movieProvider: MovieProvider,
    public downloadProvider: DownloadProvider
  ) {
    this.movies = [];

    this.movieProvider.list()
      .then((res) => {
        res.data.movies.map((item)=>{
          item.torrent = item.torrents[item.torrents.length - 1].url;
          this.movies.push(item);
        });
      });
  }

  processResult(res: any){
    res.data.movies.map((item)=>{
      item.torrent = item.torrents[item.torrents.length - 1].url;
      this.movies.push(item);
    });
  }

  reset(){
    this.page = 0;
    this.movies = [];
  }

  search(){
    let params = new URLSearchParams();
    params.set('query_term', this.query.toString());
    params.set('page', this.page.toString());
    params.set('limit', this.limit.toString());

    this.movieProvider.search(params)
    .then((res) => {
      this.processResult(res);
    });
  }

  download(movie){
    this.downloadProvider.download(movie.torrent);
  }

  openDetalis(movie){
    this.navCtrl.push(DetailsPage, {
      movie: movie
    });
  }

  loadMore(infiniteScroll){
    this.page++;
    this.search();
    infiniteScroll.complete();
  }

}
