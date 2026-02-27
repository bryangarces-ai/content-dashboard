import { MarkdownPipe } from './markdown.pipe';

describe('MarkdownPipe', () => {
  let pipe: MarkdownPipe;

  beforeEach(() => {
    pipe = new MarkdownPipe({
      bypassSecurityTrustHtml: (v: string) => v as unknown as any
    } as any);
  });

  it('should convert simple markdown to HTML', () => {
    const result = pipe.transform('**bold**');
    expect(result).toContain('<strong>bold</strong>');
  });

  it('should return empty string for null', () => {
    const result = pipe.transform(null);
    expect(result).toBe('');
  });
});
