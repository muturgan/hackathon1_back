import { unparsedImageType, imageType } from '../types/customTypes';
import { env } from '../configs/enviroment';

export function parseImages(unparsedImages: Array<unparsedImageType>): Array<imageType> {
    return unparsedImages.map(image => {
        const {tags, likedUsers, name, ...rest} = image;

        return {
        tags: JSON.parse(tags),
        likedUsers: JSON.parse(image.likedUsers),
        path: env.YA_DISK_PATH + name,
        name: name.split('-')[0],
        ...rest,
        };
    });
}
