import { Injectable } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { createClient, Entry, AssetCollection, ContentType } from 'contentful';
import { from, Observable } from 'rxjs';
import { environment } from '../environments/environment';

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

  scrollToView(anchor): void {
    this.viewScroller.scrollToAnchor(anchor);
  }
}
