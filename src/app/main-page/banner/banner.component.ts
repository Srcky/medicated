import { Component, Input, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { Observable } from 'rxjs';
import { ContentfulService } from '../../contentful.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  constructor(protected contentfulService: ContentfulService) {}

  @Input() bannerId: string;

  banner$: Observable<Entry<any>>;

  ngOnInit(): void {
    this.banner$ = this.contentfulService.getSingleEntry(this.bannerId);
  }
}
