import input from '../../inputs/openCase.json';
import { handler } from './open-case';

test('Open Case Function Handler', async () => {
  const result = await handler(input);
  expect(result).toEqual({
    id: '001',
    message: 'Case 001: opened...',
    status: 'open',
  });
});
