import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DownloadProvider } from '../../providers/download-provider/';

/*
  Generated class for the Details page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

  private movie:Object;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public downloadProvider: DownloadProvider
  ) {
    this.movie = navParams.get('movie');
  }

  download(url){
    this.downloadProvider.download(url);
  }
}
