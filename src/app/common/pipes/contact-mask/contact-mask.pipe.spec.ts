import { ContactMaskPipe } from './contact-mask.pipe';

describe('ContactMaskPipe', () => {
  const pipe = new ContactMaskPipe();

  it('should mask the center with default settings', () => {
    expect(pipe.transform('9876543210')).toBe('98******10');
  });

  it('should allow custom start and end visible lengths', () => {
    expect(pipe.transform('9876543210', '*', 3, 3)).toBe('987***210');
  });

  it('should allow custom mask characters', () => {
    expect(pipe.transform('9876543210', '#', 2, 2)).toBe('98######10');
  });

  it('should return the original string if visible lengths exceed or equal total length', () => {
    expect(pipe.transform('12345', '*', 3, 3)).toBe('12345');
  });

  it('should handle null, undefined, or non-string values gracefully', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform(12345 as any)).toBe('');
  });
});
