import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entry } from 'contentful';
import { ContentfulService } from '../contentful.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  articles: Entry<any>[] = [];

  constructor(
    private router: Router,
    private contentfulService: ContentfulService
  ) {}

  ngOnInit(): void {
    this.contentfulService
      .getContent()
      .then(articles => (this.articles = articles));
  }

  goToArticlePage(articleId) {
    this.router.navigate(['/article', articleId]);
  }
}
