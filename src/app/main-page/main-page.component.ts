import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  bannerId = '3C9CxbG4zscYzwdxQoYMVr';
  contactComponentId = '4y87ehZmC3ec05EgWoaYiV';

  constructor() {}

  ngOnInit(): void {}
}
