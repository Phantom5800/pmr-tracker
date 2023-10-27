<script setup lang="ts">
import { allItems } from "@/data/items";
import { ref, computed } from "vue";
import { useOptions } from "@/stores/config";

const optionsStore = useOptions();

const itemSearch = ref("");

const itemsToShow = computed(() =>
	itemSearch.value
		? allItems.filter((el) =>
				el.name.toLowerCase().includes(itemSearch.value.toLowerCase().trim())
		  )
		: allItems
);
</script>

<template>
	<p class="heading">
		Some items are hidden based on seed settings (e.g. Forest Pass is only shown
		when Open Forest is off). Most items are shown by default. Use this menu to
		override the default behavior.
	</p>
	<input
		type="text"
		name="itemSearch"
		id="itemSearch"
		v-model="itemSearch"
		placeholder="search"
	/>
	<ul class="itemList">
		<li class="itemEntry" v-for="item in itemsToShow">
			{{ item.name }}
			<div class="buttons">
				<button
					:class="{
						selected: optionsStore.getItemFilter(item.name) === 'show',
					}"
					@click="optionsStore.setItemFilter(item.name, 'show')"
				>
					✓</button
				><button
					:class="{
						selected: optionsStore.getItemFilter(item.name) === 'default',
					}"
					@click="optionsStore.setItemFilter(item.name, 'default')"
				>
					/</button
				><button
					:class="{
						selected: optionsStore.getItemFilter(item.name) === 'hide',
					}"
					@click="optionsStore.setItemFilter(item.name, 'hide')"
				>
					X
				</button>
			</div>
		</li>
	</ul>
</template>

<style scoped>
.heading {
	font-size: 1.25rem;
	max-width: 50ch;
}
#itemSearch {
	width: 100%;
	border-radius: 8px;
	padding: 0.5rem;
	margin-block: 1rem;
}

.itemList {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	padding: 0;
	margin: 0;
}

.itemEntry {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.buttons {
	display: flex;
	flex-flow: row nowrap;
	gap: 1px;
}

.buttons > button {
	border: 0;
	padding: 0.5rem;
	min-width: 3rem;
	cursor: pointer;
	color: var(--primary-color);
	background-color: rgba(255, 255, 255, 0.9);
}

.buttons > button:hover {
	background-color: rgba(220, 220, 220, 0.9);
}

.buttons > button:nth-child(1) {
	border-radius: 8px 0 0 8px;
	--primary-color: rgb(0, 180, 80);
}

.buttons > button:nth-child(2) {
	border-radius: 0;
	--primary-color: rgb(127, 127, 127);
}

.buttons > button:nth-child(3) {
	border-radius: 0 8px 8px 0;
	--primary-color: rgb(180, 0, 80);
}

.buttons > .selected {
	background-color: var(--primary-color);
	color: white;
}

.buttons > .selected:hover {
	background-color: var(--primary-color);
}
</style>
