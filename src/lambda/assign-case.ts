import { ICase } from './types';

export const handler = async (event: ICase): Promise<ICase> => {
  // Assign the support case and update the status message
  const myCaseID = event.id;
  const myMessage = event.message + 'assigned...';
  return { id: myCaseID, message: myMessage, status: 'assigned' };
};
