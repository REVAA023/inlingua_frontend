import { EncodeUrlPipe } from './encode-url.pipe';

describe('EncodeUrlPipe', () => {
  const pipe = new EncodeUrlPipe();

  it('should encode a string into a URL-safe format', () => {
    expect(pipe.transform('Hello World!')).toBe('eyJkYXRhIjoiSGVsbG8gV29ybGQhIn0%3D');
  });

  it('should encode an object into a URL-safe format', () => {
    expect(pipe.transform({ id: 123, name: 'John Doe' })).toBe(
      'eyJkYXRhIjp7ImlkIjoxMjMsIm5hbWUiOiJKb2huIERvZSJ9fQ%3D%3D'
    );
  });

  it('should decode a valid encoded string back to its original object', () => {
    const encodedValue = 'eyJkYXRhIjp7ImlkIjoxMjMsIm5hbWUiOiJKb2huIERvZSJ9fQ%3D%3D';
    const decodedValue = pipe.transform(encodedValue, true);
    expect(decodedValue).toEqual({ id: 123, name: 'John Doe' });
  });

  it('should return null for null or undefined inputs', () => {
    expect(pipe.transform(null)).toBeNull();
    expect(pipe.transform(undefined)).toBeNull();
  });

  it('should handle decoding errors gracefully', () => {
    expect(pipe.transform('InvalidEncodedString', true)).toBeNull();
  });

  it('should handle non-object inputs by wrapping them as strings', () => {
    expect(pipe.transform(123)).toBe('eyJkYXRhIjoiMTIzIn0%3D');
  });
});
