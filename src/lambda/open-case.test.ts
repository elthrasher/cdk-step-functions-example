import input from '../../inputs/openCase.json';
import { handler } from './open-case';

test('Open Case Function Handler', async () => {
  const result = await handler(input);
  expect(result).toEqual({
    Case: '001',
    Message: 'Case 001: opened...',
  });
});
