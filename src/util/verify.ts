import { verify as Verify } from 'jsonwebtoken';
import { promisify } from 'util';

export const verify = promisify(Verify);
