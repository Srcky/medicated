import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';

@Pipe({
  name: 'mdToHtml',
})
export class MdToHtmlPipe implements PipeTransform {
  transform(value: any): unknown {
    return marked(value);
  }
}
