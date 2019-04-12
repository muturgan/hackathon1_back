export function parseLikedUsers(usersStr: string, email: string|null): boolean {
    try {
        if (!email) { return false; }

        const usersArr = JSON.parse(usersStr) as Array<string>;

        return usersArr.includes(email);

    } catch (err) { throw err; }
}
