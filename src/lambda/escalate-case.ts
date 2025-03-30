import { ICase } from './types';

export const handler = async (event: ICase): Promise<ICase> => {
  // Escalate the support case
  const myCaseID = event.id;
  const myCaseStatus = event.status;
  const myMessage = event.message + 'escalating.';
  return { id: myCaseID, status: myCaseStatus, message: myMessage };
};
