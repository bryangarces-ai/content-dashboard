import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Pipe({
  name: 'markdown',
  standalone: true,
})
export class MarkdownPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | null | undefined): SafeHtml {
    if (!value) {
      return '' as unknown as SafeHtml;
    }
    // marked.parse may return string or Promise<string>; ensure we have a string
    const raw = marked.parse(value) as unknown;
    const html = typeof raw === 'string' ? raw : '';
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
