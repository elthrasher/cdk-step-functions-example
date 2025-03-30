import input from '../../inputs/assignCase.json';
import { handler } from './assign-case';

test('Assign Case Function Handler', async () => {
  const result = await handler(input);
  expect(result).toEqual({
    id: '001',
    message: 'Case 001: opened...assigned...',
    status: 'assigned',
  });
});
