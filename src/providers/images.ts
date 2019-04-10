import { knex } from '../services/db-driver';
import { unparsedImageType, imageType } from '../types/customTypes';
import { env } from '../configs/enviroment';


type getImagesOptions = {
    sortBy?: 'id'|'name'|'likes',
    direction?: 'asc'|'desc',
    limit?: number,
    offset?: number,
};

const defaultOptions = {
    sortBy: 'id',
    direction: 'asc',
    limit: 80,
    offset: 0,
};


function parseImages(unparsedImages: Array<unparsedImageType>): Array<imageType> {
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



export async function pGetManyImages(opt: getImagesOptions): Promise<Array<imageType>> {
    try {
        const sortBy = opt.sortBy ? opt.sortBy : defaultOptions.sortBy;
        const direction = opt.direction ? opt.direction : defaultOptions.direction;
        const limit = opt.limit ? +opt.limit : defaultOptions.limit;
        const offset = opt.offset ? +opt.offset : defaultOptions.offset;

        const unparsedImages = await knex('images')
            .select()
            .orderBy(sortBy, direction)
            .limit(limit)
            .offset(offset) as Array<unparsedImageType>;

        return parseImages(unparsedImages);

    } catch (err) { throw err; }
}


export async function pGetOneImage(id: number): Promise<imageType|null> {
    try {
        if (Number.isNaN(id)) { return null; }

        const unparsedImages = await knex('images')
            .select()
            .where({id}) as [unparsedImageType];

        if (!unparsedImages.length) { return null; }

        return parseImages(unparsedImages)[0];

    } catch (err) { throw err; }
}
