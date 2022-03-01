import { queryString, parse } from './queryString';

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Carlos',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Carlos&profession=developer');
  });

  it('should create a valid query string even when an array is provided', () => {
    const obj = {
      name: 'Carlos',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe('name=Carlos&abilities=JS,TDD');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Carlos',
      abilities: {
        fist: 'JS',
        second: 'TDD',
      },
    };

    expect(() => queryString(obj)).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query string to object', () => {
    const qs = 'name=Carlos&profession=developer';

    expect(parse(qs)).toEqual({
      name: 'Carlos',
      profession: 'developer',
    });
  });

  it('should convert a query string of a single key-value to object', () => {
    const qs = 'name=Carlos';

    expect(parse(qs)).toEqual({ name: 'Carlos' });
  });

  it('should convert a query string to an object taking care of comma separated values', () => {
    const qs = 'name=Carlos&abilities=JS,TDD';

    expect(parse(qs)).toEqual({ name: 'Carlos', abilities: ['JS', 'TDD'] });
  });
});
