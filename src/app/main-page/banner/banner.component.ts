import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ContentfulService } from '../../contentful.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  constructor(protected contentfulService: ContentfulService) {}

  contents$ = this.contentfulService.getEntries(
    environment.contentful.contentTypeIds.banner
  );

  ngOnInit(): void {}
}
