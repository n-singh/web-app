
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Photo } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort: string | undefined;
  public photos: Array<Photo> | undefined;
  private routeSub: Subscription | undefined;
  private photoSub: Subscription | undefined;

  constructor(    
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['photo-search']) {
        this.searchPhotos('metacrit', params['photo-search']);
      } else {
        this.searchPhotos('metacrit');
      }
    });
  }

  searchPhotos(sort: string, search?: string): void {
    this.photoSub = this.httpService
      .getPhotoList(sort, search)
      .subscribe((photoList: APIResponse<Photo>) => {
        this.photos = photoList.results;
      });
  }

  ngOnDestroy(): void {
    if (this.photoSub) {
      this.photoSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
