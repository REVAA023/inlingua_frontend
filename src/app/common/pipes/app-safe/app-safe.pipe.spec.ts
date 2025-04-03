import { AppSafePipe } from './app-safe.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

describe('AppSafePipe', () => {
  let pipe: AppSafePipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomSanitizer],
    });

    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new AppSafePipe(sanitizer);
  });

  it('should sanitize HTML content', () => {
    const result = pipe.transform('<div>Test</div>', 'html');
    expect(result).toBeTruthy();
  });

  it('should sanitize style content', () => {
    const result = pipe.transform('color: red;', 'style');
    expect(result).toBeTruthy();
  });

  it('should sanitize script content', () => {
    const result = pipe.transform('alert("test");', 'script');
    expect(result).toBeTruthy();
  });

  it('should sanitize URL content', () => {
    const result = pipe.transform('http://example.com', 'url');
    expect(result).toBeTruthy();
  });

  it('should sanitize resource URL content', () => {
    const result = pipe.transform('http://example.com/resource', 'resourceUrl');
    expect(result).toBeTruthy();
  });

  it('should throw an error for unsupported types', () => {
    expect(() => pipe.transform('<div>Test</div>', 'invalid' as any)).toThrowError(
      "AppSafePipe: Unsupported type 'invalid'"
    );
  });

  it('should warn for missing values', () => {
    spyOn(console, 'warn');
    const result = pipe.transform('', 'html');
    expect(console.warn).toHaveBeenCalledWith('AppSafePipe: No value provided to sanitize.');
    expect(result).toBe('');
  });
});
