import input from '../../inputs/workOnCase.json';
import { handler } from './work-on-case';

test('Work On Case Function Handler - Resolved', async () => {
  global.Math.random = (): number => 0.5;
  const result = await handler(input);
  expect(result).toEqual({
    Case: '001',
    Status: 1,
    Message: 'Case 001: opened...assigned...resolved...',
  });
});

test('Work On Case Function Handler - Unresolved', async () => {
  global.Math.random = (): number => 0;
  const result = await handler(input);
  expect(result).toEqual({
    Case: '001',
    Status: 0,
    Message: 'Case 001: opened...assigned...unresolved...',
  });
});
