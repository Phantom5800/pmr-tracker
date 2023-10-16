import type { OptionsValues } from "@/stores/config";

export type TrackableItemInfo = {
	chapter?: number;
	name: string;
	image: string;
	multiple?: number;
	label?: string;
	type: string;
	show?: (settings: OptionsValues) => boolean;
	turnInCheck?: string;
};
