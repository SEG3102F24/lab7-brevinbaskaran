import { Author } from './author';

describe('Book', () => {
  it('should create an instance', () => {
    expect(new Author(1, 'test', 'test')).toBeTruthy();
  });
});
