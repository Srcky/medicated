import { Injectable } from '@angular/core';
import { createClient, Entry, AssetCollection, ContentType } from 'contentful';
import { from, Observable } from 'rxjs';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { environment } from '../environments/environment';
import { ViewportScroller } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private client = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.token,
  });

  constructor(private viewScroller: ViewportScroller) {}

  getContentTypes(): Observable<ContentType[]> {
    return from(this.client.getContentTypes().then(res => res.items));
  }

  getEntries(entryType?): Observable<Entry<any>[]> {
    return from(
      this.client.getEntries({ content_type: entryType }).then(res => res.items)
    );
  }

  getSingleEntry(entryId): Observable<Entry<any>> {
    return from(this.client.getEntry(entryId).then(item => item));
  }

  // getAllContentTypes(): Observable<string[]> {
  //   const contentTypes = [];
  //   return this.getContentTypes().pipe(
  //     map(data => {
  //       data.forEach(item => contentTypes.push(item.name));
  //       return contentTypes;
  //     })
  //   );
  // }

  getContent(query?: object): Observable<Entry<any>[]> {
    return from(
      this.client
        .getEntries(
          Object.assign(
            {
              content_type: environment.contentful.contentTypeIds.medicated,
            },
            query
          )
        )
        .then(res => res.items)
    );
  }

  getAssets(query?: object): Observable<AssetCollection> {
    return from(this.client.getAssets(query).then(collection => collection));
  }

  parseHtml(content): string {
    const options = {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: node => {
          const src = node?.data?.target?.fields?.file?.url;
          const alt = node?.data?.target?.fields?.title;
          return `<img src="${src}" alt="${alt}">`;
        },
      },
    };
    return documentToHtmlString(content, options);
  }

  scrollToView(anchor): void {
    this.viewScroller.scrollToAnchor(anchor);
  }
}
