import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Entry,
  AssetCollection,
  ContentTypeCollection,
  ContentType,
  ContentfulCollection,
} from 'contentful';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContentfulService } from '../../contentful.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent {
  contents$ = this.contentfulService.getEntries(
    environment.contentful.contentTypeIds.medicated
  );
  // images$: Observable<AssetCollection> = this.contentfulService.getAssets();
  contentTypes: string[] = [];

  constructor(
    private router: Router,
    private contentfulService: ContentfulService
  ) {}

  goToArticlePage(articleId): void {
    this.router.navigate(['/article', articleId]);
  }

  getImage(stuff): void {
    console.log(stuff);
  }
}
