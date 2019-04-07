import { sign } from 'jsonwebtoken';
import { env } from '../configs/enviroment';


export function getJwtTokcen(email: string): string {

    return sign(
        {email},
        env.SECRET,
        {expiresIn: 86400}, // expires in 24 hours
    );
}
