import { Component, Input, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { Observable } from 'rxjs';
import { ContentfulService } from '../../contentful.service';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],
})
export class HeadingComponent implements OnInit {
  constructor(protected contentfulService: ContentfulService) {}

  @Input() headingId: string;

  heading$: Observable<Entry<any>>;

  ngOnInit(): void {
    this.heading$ = this.contentfulService.getSingleEntry(this.headingId);
  }
}
