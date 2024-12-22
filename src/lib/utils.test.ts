import { expect, test } from 'vitest';
import { slug } from './utils';

test('utils', () => {
  const str = slug('One Two #X');
  expect(str).toEqual('one-two-x');
});
