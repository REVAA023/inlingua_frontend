import { EmailMaskPipe } from './email-mask.pipe';

describe('EmailMaskPipe', () => {
  const pipe = new EmailMaskPipe();

  it('should mask email with default settings', () => {
    expect(pipe.transform('example@email.com')).toBe('e******@email.com');
  });

  it('should allow custom mask characters', () => {
    expect(pipe.transform('example@email.com', '#')).toBe('e######@email.com');
  });

  it('should allow custom unmasked length', () => {
    expect(pipe.transform('example@email.com', '*', 2)).toBe('ex*****@email.com');
  });

  it('should handle short usernames gracefully', () => {
    expect(pipe.transform('a@domain.com', '*', 1)).toBe('a@domain.com');
  });

  it('should return an empty string for invalid email formats', () => {
    expect(pipe.transform('invalidEmail')).toBe('');
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });

  it('should return an empty string for non-string values', () => {
    expect(pipe.transform(12345 as any)).toBe('');
  });
});
