import { ICase } from './types';

export const handler = async (event: ICase): Promise<ICase> => {
  // Close the support case
  const myCaseStatus = event.status;
  const myCaseID = event.id;
  const myMessage = event.message + 'closed.';
  return { id: myCaseID, status: myCaseStatus, message: myMessage };
};
