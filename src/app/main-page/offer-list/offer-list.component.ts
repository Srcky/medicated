import { Component, Input, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { Observable } from 'rxjs';
import { ContentfulService } from '../../contentful.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss'],
})
export class OfferListComponent implements OnInit {
  @Input() contentId: string;
  @Input() sectionClassName: string;

  contents$: Observable<Entry<any>>;

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {
    this.contents$ = this.contentfulService.getSingleEntry(this.contentId);
  }

  parseInnerHtml(content): string {
    return this.contentfulService.parseHtml(content);
  }
}
