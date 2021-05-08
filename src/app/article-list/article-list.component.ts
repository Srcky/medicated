import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entry, AssetCollection } from 'contentful';
import { Observable } from 'rxjs';
import { ContentfulService } from '../contentful.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  // articles: Entry<any>[] = [];
  // images: Asset[] = [];

  contents$: Observable<Entry<any>[]> = this.contentfulService.getContent();
  images$: Observable<AssetCollection> = this.contentfulService.getAssets();

  constructor(
    private router: Router,
    private contentfulService: ContentfulService
  ) {}

  ngOnInit(): void {
    // kao obican promise
    // this.contentfulService
    //   .getContent()
    //   .then(articles => (this.articles = articles));
    // kao obican promise
    // this.contentfulService.getAssets().then(img => (this.images = img.items));
  }

  goToArticlePage(articleId): void {
    this.router.navigate(['/article', articleId]);
  }

  getImage(stuff): void {
    console.log(stuff);
  }
}
