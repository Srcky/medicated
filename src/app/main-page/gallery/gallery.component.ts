import { Component, Input, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { Observable } from 'rxjs';
import { ContentfulService } from '../../contentful.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  @Input() contentId: string;

  contents$: Observable<Entry<any>>;

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {
    this.contents$ = this.contentfulService.getSingleEntry(this.contentId);
  }
}
