/* eslint-disable @typescript-eslint/consistent-type-assertions */
export const safeKeys = <T extends object>(o: T) =>
	Object.getOwnPropertyNames(o) as Array<keyof T>;
/* eslint-enable */
