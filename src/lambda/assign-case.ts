import { ICase } from './types';

export const handler = async (event: ICase): Promise<ICase> => {
  // Assign the support case and update the status message
  const myCaseID = event.Case;
  const myMessage = event.Message + 'assigned...';
  return { Case: myCaseID, Message: myMessage };
};
