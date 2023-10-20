import { allItems } from "@/data/items";
import type { Options } from "@/stores/config";

export const has3Letters = (items: string[], _: Options): boolean => {
	return (
		allItems.filter((el) => el.type === "letter" && items.includes(el.name))
			.length >= 3
	);
};
