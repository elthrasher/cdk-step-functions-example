import { ICase } from './types';

export const handler = async (event: ICase): Promise<ICase> => {
  // Escalate the support case
  const myCaseID = event.Case;
  const myCaseStatus = event.Status;
  const myMessage = event.Message + 'escalating.';
  return { Case: myCaseID, Status: myCaseStatus, Message: myMessage };
};
