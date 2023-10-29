import type { PlaythroughProps } from "@/stores/playthrough";
import type { Options, ItemFilter } from "@/stores/config";
import type { Layout } from "grid-layout-plus";

export type SaveData = {
	playthrough?: PlaythroughProps;
	layout?: Layout;
	itemFilters?: Record<string, ItemFilter>;
} & Partial<Options>;
