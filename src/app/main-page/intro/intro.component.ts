import { Component, Input, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/contentful.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  constructor(protected contentfulService: ContentfulService) {}

  @Input() componentId: string;

  contactContent$: Observable<Entry<any>>;

  ngOnInit(): void {
    this.contactContent$ = this.contentfulService.getSingleEntry(
      this.componentId
    );
  }
}
