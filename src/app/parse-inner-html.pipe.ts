import { Pipe, PipeTransform } from '@angular/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

@Pipe({
  name: 'parseInnerHTML',
})
export class ParseInnerHTMLPipe implements PipeTransform {
  transform(content): string {
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
}
