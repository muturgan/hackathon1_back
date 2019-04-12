import { unparsedImagePrivateType, imageType } from '../types/customTypes';
import { parseTags } from './parseTags';
import { parseLikedUsers } from './parseLikedUsers';


export function parseImagesPrivate(unparsedImages: Array<unparsedImagePrivateType>, email: string|null): Array<imageType> {
    return unparsedImages.map(image => {
        const {tags, likedUsers, name, privatePath, ...rest} = image;

        return {
            tags: parseTags(tags),
            likedByYou: parseLikedUsers(image.likedUsers, email),
            path: privatePath,
            name: name.split('-')[0],
            ...rest,
        };
    });
}
