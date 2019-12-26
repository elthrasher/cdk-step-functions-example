import input from '../../inputs/assignCase.json';
import { handler } from './assign-case';

test('Assign Case Function Handler', async () => {
  const result = await handler(input);
  expect(result).toEqual({
    Case: '001',
    Message: 'Case 001: opened...assigned...',
  });
});
