<script setup lang="ts">
import { useOptions } from "@/stores/config";
import { storeToRefs } from "pinia";
import { ref, computed, defineProps } from "vue";
import {
	useFloating,
	autoPlacement,
	offset,
	shift,
	arrow,
	autoUpdate,
} from "@floating-ui/vue";

const optionsStore = useOptions();
const { options } = storeToRefs(optionsStore);

const cssVars = computed(() => ({
	"--section-color": options.value.sectionColor,
}));

const { name } = defineProps<{ name: string }>();

const buttonRef = ref(null);
const tooltipRef = ref(null);
const arrowRef = ref(null);

const { floatingStyles, middlewareData, placement } = useFloating(
	buttonRef,
	tooltipRef,
	{
		middleware: [
			autoPlacement({ allowedPlacements: ["bottom", "top"] }),
			offset(16),
			shift(),
			arrow({ element: arrowRef }),
		],
		placement: "top",
		whileElementsMounted: autoUpdate,
		transform: false,
	}
);
</script>

<template>
	<div ref="buttonRef" class="button" :style="cssVars">
		<div class="svg">
			<slot></slot>
		</div>
		<div
			ref="tooltipRef"
			class="tooltip"
			:style="{
				...floatingStyles,
				transformOrigin:
					placement === 'bottom' ? 'top center' : 'bottom center',
			}"
		>
			{{ name }}
			<div
				ref="arrowRef"
				class="arrow"
				:style="{
					left: middlewareData.arrow
						? `${middlewareData.arrow.x}px`
						: undefined,
					top: placement === 'bottom' ? 0 : undefined,
					bottom: placement === 'top' ? 0 : undefined,
					translate: placement === 'bottom' ? '0 -50%' : '0 50%',
				}"
			></div>
		</div>
	</div>
</template>

<style scoped>
.svg {
	width: 100%;
	height: 100%;
	transition:
		background-color 0.3s,
		stroke 0.3s;
	inset: 2;
	scale: 0.75;
}

.button {
	position: relative;
	transition:
		background-color 0.3s,
		color 0.3s;
	cursor: pointer !important;
	aspect-ratio: 1 / 1;
	min-height: 1rem;
	height: 100%;
	max-height: 4rem;
	border-radius: 5px;
	background-color: var(--section-color);
	color: white;
	display: grid;
	place-items: center;
	flex-shrink: 1;
	flex-grow: 0;
	flex-basis: 0;
	padding: 0 !important;
}

div.button:hover {
	background-color: white;
	color: var(--section-color);
}

div.button > .svg {
	stroke: white;
	background-color: var(--section-color);
}

div.button:hover > .svg {
	background-color: white;
	stroke: var(--section-color);
}

div.arrow {
	width: 0;
	height: 0;
	padding: 0.6rem;
	rotate: 45deg;
	background-color: #101020;
	z-index: -10;
	position: absolute;
}

div.tooltip {
	transform-origin: bottom center;
	background-color: #101020;
	padding: 0.5rem 1rem;
	width: max-content;
	border-radius: 8px;
	z-index: 10;
	transform: scale(0%);
	transition: transform 0.15s;
	color: white;
	pointer-events: none;
}

div.button:hover > div.tooltip {
	transform: scale(100%);
}
</style>
