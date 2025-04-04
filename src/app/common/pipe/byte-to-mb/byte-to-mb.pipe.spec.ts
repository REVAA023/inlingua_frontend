import { ByteToMbPipe } from './byte-to-mb.pipe';

describe('ByteToMbPipe', () => {
  it('create an instance', () => {
    const pipe = new ByteToMbPipe();
    expect(pipe).toBeTruthy();
  });
});
