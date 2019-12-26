import { handler } from './escalate-case';

test('Escalate Case Function Handler', async () => {
  const input = { Case: '001', Message: 'Case 001: opened...assigned...unresolved...', Status: 0 };
  const result = await handler(input);
  expect(result).toEqual({
    Case: '001',
    Message: 'Case 001: opened...assigned...unresolved...escalating.',
    Status: 0,
  });
});
