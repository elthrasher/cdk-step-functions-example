import input from '../../inputs/escalateCase.json';
import { handler } from './escalate-case';

test('Escalate Case Function Handler', async () => {
  const result = await handler(input);
  expect(result).toEqual({
    id: '001',
    message: 'Case 001: opened...assigned...unresolved...escalating.',
    status: 'escalated',
  });
});
