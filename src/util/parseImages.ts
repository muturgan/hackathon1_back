import { unparsedImageType, imageType } from '../types/customTypes';
import { env } from '../configs/enviroment';
import { parseTags } from './parseTags';
import { parseLikedUsers } from './parseLikedUsers';

export function parseImages(unparsedImages: Array<unparsedImageType>, email: string|null): Array<imageType> {
    return unparsedImages.map(image => {
        const {tags, likedUsers, name, ...rest} = image;

        return {
            tags: parseTags(tags),
            likedByYou: parseLikedUsers(image.likedUsers, email),
            path: env.YA_DISK_PATH + name,
            name: name.split('-')[0],
            ...rest,
        };
    });
}
