import input from '../../inputs/closeCase.json';
import { handler } from './close-case';

test('Close Case Function Handler', async () => {
  const result = await handler(input);
  expect(result).toEqual({
    id: '001',
    message: 'Case 001: opened...assigned...resolved...closed.',
    status: 'resolved',
  });
});
