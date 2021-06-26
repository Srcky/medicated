import { Component, Input, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/contentful.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(protected contentfulService: ContentfulService) {}

  @Input() componentId: string;

  contactContent$: Observable<Entry<any>>;

  ngOnInit(): void {
    this.contactContent$ = this.contentfulService.getSingleEntry(
      this.componentId
    );
  }
}
