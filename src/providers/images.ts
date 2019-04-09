import { knex } from '../services/db-driver';
import { unparsedImageType, imageType } from '../types/customTypes';


type getImagesOptions = {
    sortBy?: 'id'|'name'|'likes',
    direction?: 'asc'|'desc',
    limit?: number,
    offset?: number,
};

const defaultOptions: getImagesOptions = {
    sortBy: 'id',
    direction: 'desc',
    limit: 80,
    offset: 0,
};


function parseImages(unparsedImages: Array<unparsedImageType>): Array<imageType> {
    return unparsedImages.map(image => {
        const {tags, likedUsers, ...rest} = image;

        return {
        tags: JSON.parse(tags),
        likedUsers: JSON.parse(image.likedUsers),
        ...rest,
        };
    });
}



export async function pGetManyImages(opt: getImagesOptions = defaultOptions): Promise<Array<imageType>> {
    try {
        const sortBy = opt.sortBy ? opt.sortBy : 'id';
        const direction = opt.direction ? opt.direction : 'desc';
        const limit = opt.limit ? opt.limit : 80;
        const offset = opt.offset ? opt.offset : 0;

        const unparsedImages = await knex('images')
            .select()
            .orderBy(sortBy, direction)
            .limit(limit)
            .offset(offset) as Array<unparsedImageType>;

        return parseImages(unparsedImages);

    } catch (err) { throw err; }
}


export async function pGetOneImage(id: number): Promise<imageType> {
    try {
        const unparsedImages = await knex('images')
            .select()
            .where({id}) as [unparsedImageType];

        return parseImages(unparsedImages)[0];

    } catch (err) { throw err; }
}
