import { Component, Input, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { Observable } from 'rxjs';
import { ContentfulService } from '../../contentful.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
})
export class PageListComponent implements OnInit {
  @Input() contentId: string;
  @Input() sectionClassName: string;
  @Input() classCol: string;

  contents$: Observable<Entry<any>>;

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {
    this.contents$ = this.contentfulService.getSingleEntry(this.contentId);
  }

  parseInnerHtml(content): string {
    return this.contentfulService.parseHtml(content);
  }
}
