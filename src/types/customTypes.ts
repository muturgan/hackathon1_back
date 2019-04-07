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

export type userType = {
    id: number,
    login: string,
    password: null,
    email: string,
    phone: string,
    fullname?: string,
    birthday?: string,
    index?: string,
    city?: string,
    street?: string,
    building?: string,
    permissions: number,
    comment?: string,
    status: string,
    updatingDate?: string,
    creationDate: string,
};