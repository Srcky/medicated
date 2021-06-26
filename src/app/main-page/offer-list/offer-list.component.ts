import { Component } from '@angular/core';
import { Entry } from 'contentful';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContentfulService } from '../../contentful.service';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss'],
})
export class OfferListComponent {
  contents$: Observable<Entry<any>[]> = this.contentfulService.getEntries(
    environment.contentful.contentTypeIds.richListItems
  );

  constructor(private contentfulService: ContentfulService) {}

  headingId = '4xEusWCIw2emuv2DBSgfGw';

  embededAssets(src, alt): string {
    return `<img src="${src}"
  alt="${alt}">`;
  }

  parseHtml(content): string {
    const options = {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: node => {
          console.log(node.data.target);
          const src = node.data.target.fields.file.url;
          const alt = node.data.target.fields.title;
          return this.embededAssets(src, alt);
        },
      },
    };
    return documentToHtmlString(content, options);
  }
}
