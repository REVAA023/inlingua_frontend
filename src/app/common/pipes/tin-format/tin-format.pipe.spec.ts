import { TinFormatPipe } from './tin-format.pipe';

describe('TinFormatPipe', () => {
  const pipe = new TinFormatPipe();

  it('should format TIN using default format', async () => {
    const result = await pipe.transform('123456789');
    expect(result).toBe('12-34567-8-9');
  });

  it('should format TIN using custom format', async () => {
    const result = await pipe.transform('123456789012', 'xx-xxxxxx-xx');
    expect(result).toBe('12-345678-90');
  });

  it('should handle invalid TIN gracefully', async () => {
    const result = await pipe.transform('abcd1234');
    expect(result).toBe('Invalid TIN');
  });

  it('should handle null or undefined TIN', async () => {
    expect(await pipe.transform(null)).toBe('Invalid TIN');
    expect(await pipe.transform(undefined)).toBe('Invalid TIN');
  });

  it('should handle non-string TIN', async () => {
    const result = await pipe.transform(123456789);
    expect(result).toBe('12-34567-8-9');
  });

  it('should trim formatted TIN to match format length', async () => {
    const result = await pipe.transform('123456789', 'xx-xxxx');
    expect(result).toBe('12-3456');
  });
});
