import {customAlphabet} from 'nanoid';
const nanoid = customAlphabet('1234567890', 8);

export const genTicket = () => {
  const tid = [...nanoid()];
  tid.splice(4, 0, '-');
  return tid.join('');
};
