// This will eventually be used for things like:
// ?page=0
// &size=20
// &search=john
// &status=ACTIVE

export type QueryParams = Record<
    string,
    string | number | boolean | null | undefined
>;