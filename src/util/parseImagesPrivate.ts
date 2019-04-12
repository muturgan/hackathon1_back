import { unparsedImagePrivateType, imageType } from '../types/customTypes';


export function parseImagesPrivate(unparsedImages: Array<unparsedImagePrivateType>): Array<imageType> {
    return unparsedImages.map(image => {
        const {tags, likedUsers, name, privatePath, ...rest} = image;

        return {
            tags: JSON.parse(tags),
            likedUsers: JSON.parse(image.likedUsers),
            path: privatePath,
            name: name.split('-')[0],
            ...rest,
        };
    });
}
