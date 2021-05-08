import { Injectable } from '@angular/core';
import { createClient, Entry, AssetCollection } from 'contentful';
import { from, Observable } from 'rxjs';
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

  getContent(query?: object): Observable<Entry<any>[]> {
    return from(
      this.client
        .getEntries(
          Object.assign(
            {
              content_type: 'medicated',
            },
            query
          )
        )
        .then(res => res.items)
    );
  }

  getArticle(articleId: string): Observable<Entry<any>> {
    return from(
      this.client
        .getEntries(
          Object.assign(
            {
              content_type: 'medicated',
            },
            { 'sys.id': articleId }
          )
        )
        .then(res => res.items[0])
    );
  }

  getAssets(query?: object): Observable<AssetCollection> {
    return from(this.client.getAssets(query).then(collection => collection));
  }
}
