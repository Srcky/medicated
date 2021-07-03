import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'src/app/contentful.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private mainService: ContentfulService) {}

  ngOnInit(): void {}

  scrollTo(evt: UIEvent): void {
    evt.preventDefault();
    const event = evt.target as HTMLElement;
    this.mainService.scrollToView(event.dataset.anchor);
    // event.scrollIntoView({ behavior: 'smooth' });
  }
}
