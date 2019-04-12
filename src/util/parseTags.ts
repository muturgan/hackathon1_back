import { tagType } from '../types/customTypes';


export function parseTags(tagString: string): Array<tagType> {
    try {
        const tagArr = JSON.parse(tagString) as Array<string>;

        return tagArr.map(tag => ({
            value: tag,
            title: tag,
        }));

    } catch (err) { throw err; }
}
