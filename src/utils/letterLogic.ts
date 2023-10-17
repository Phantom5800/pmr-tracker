import { allItems } from "@/data/items";
import type { OptionsValues } from "@/stores/config";

export const has3Letters = (items: string[], _: OptionsValues): boolean => {
	return (
		allItems.filter((el) => el.type === "letter" && items.includes(el.name))
			.length >= 3
	);
};
