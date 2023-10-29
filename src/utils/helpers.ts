/* eslint-disable @typescript-eslint/consistent-type-assertions */
export const safeKeys = <T extends object>(o: T) =>
	Object.getOwnPropertyNames(o) as Array<keyof T>;
/* eslint-enable */

export function throttle<T>(
	fn: (...args: T[]) => void,
	wait: number
): (...args: T[]) => void {
	let throttled = false;
	return function (...args: T[]) {
		if (!throttled) {
			fn(...args);
			throttled = true;
			setTimeout(() => {
				throttled = false;
			}, wait);
		}
	};
}
