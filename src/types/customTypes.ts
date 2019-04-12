export type sqlEditRequestType = {
    readonly fieldCount: number,
    readonly affectedRows: number,
    readonly insertId: number,
    readonly serverStatus: number,
    readonly warningCount: number,
    readonly message: string,
    readonly protocol41: boolean,
    readonly changedRows: number,
};

export type userDataType = {
    readonly first_name: string,
    readonly last_name: string,
    readonly display_name: string,
    readonly emails: ReadonlyArray<string>,
    readonly default_avatar_id: string,
    readonly default_email: string,
    readonly real_name: string,
    readonly is_avatar_empty: boolean,
    readonly client_id: string,
    readonly login: string,
    readonly sex: 'male'|'female',
    readonly id: string,
};


export type unparsedImageType = {
    readonly id: number,
    readonly name: string,
    readonly tags: string,
    readonly likedUsers: string,
    readonly likes: number,
};


export type unparsedImagePrivateType = {
    readonly id: number,
    readonly name: string,
    readonly tags: string,
    readonly likedUsers: string,
    readonly likes: number,
    readonly privatePath: string,
};


export type tagType = {
    readonly value: string,
    readonly title: string,
};


export type imageType = {
    readonly id: number,
    readonly name: string,
    readonly path: string,
    readonly tags: ReadonlyArray<tagType>,
    readonly likedByYou: boolean,
    readonly likes: number,
};


export type yaDiskType = {
    readonly _embedded: {
        readonly items: ReadonlyArray<{
            readonly name: string,
            readonly file: string,
            readonly preview: string,
        }>,
    },
};


export type normallizedYaDiskData = {
    [key: string]: {
        readonly src: string,
        readonly thumbnail: string,
    }
};
