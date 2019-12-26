import { ICase } from './types';

export const handler = async (event: ICase): Promise<ICase> => {
  // Close the support case
  const myCaseStatus = event.Status;
  const myCaseID = event.Case;
  const myMessage = event.Message + 'closed.';
  return { Case: myCaseID, Status: myCaseStatus, Message: myMessage };
};
