import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
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

  getContent(query?: object): Promise<Entry<any>[]> {
    return this.client
      .getEntries(
        Object.assign(
          {
            content_type: 'medicated',
          },
          query
        )
      )
      .then(res => res.items);
  }

  getArticle(articleId: string): Promise<Entry<any>> {
    return this.client
      .getEntries(
        Object.assign(
          {
            content_type: 'medicated',
          },
          { 'sys.id': articleId }
        )
      )
      .then(res => res.items[0]);
  }
}
