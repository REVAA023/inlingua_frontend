import { ByteToMbPipe } from './byte-to-mb.pipe';

describe('ByteToMbPipe', () => {
  const pipe = new ByteToMbPipe();

  it('should return formatted MB value for valid input', () => {
    expect(pipe.transform(10485760)).toBe('10.00 MB'); // 10 MB
  });

  it('should handle custom decimal precision', () => {
    expect(pipe.transform(10485760, 3)).toBe('10.000 MB');
  });

  it('should return "Invalid input" for null', () => {
    expect(pipe.transform(null)).toBe('Invalid input');
  });

  it('should return "Invalid input" for undefined', () => {
    expect(pipe.transform(undefined)).toBe('Invalid input');
  });

  it('should return "Invalid input" for non-numeric values', () => {
    expect(pipe.transform(NaN)).toBe('Invalid input');
  });

  it('should return "Negative values not allowed" for negative inputs', () => {
    expect(pipe.transform(-1024)).toBe('Negative values not allowed');
  });
});
