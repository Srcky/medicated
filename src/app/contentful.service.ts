import { Injectable } from '@angular/core';
import {
  createClient,
  Entry,
  AssetCollection,
  ContentType,
  EntryCollection,
} from 'contentful';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private client = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.token,
  });

  constructor() {}

  getContentTypes(): Observable<ContentType[]> {
    return from(this.client.getContentTypes().then(res => res.items));
  }

  getEntries(entryType?): Observable<Entry<any>[]> {
    return from(
      this.client.getEntries({ content_type: entryType }).then(res => res.items)
    );
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
}
