<script setup lang="ts">
import { useOptions } from "@/stores/config";
import { storeToRefs } from "pinia";
import type { Options } from "@/stores/config";

const optionsStore = useOptions();

const { options } = storeToRefs(optionsStore);

const props = defineProps<{
	optionsKeys: (keyof Options)[];
}>();
</script>

<template>
	<div class="flex">
		<div
			v-for="key in props.optionsKeys"
			:key="key"
			class="flex-row"
			@click="
				optionsStore.getType(key) === 'boolean' && optionsStore.toggle(key)
			"
		>
			<div class="option-name" colspan="3">{{ optionsStore.getName(key) }}</div>
			<div v-if="optionsStore.getType(key) === 'boolean'" class="option">
				<div class="checkbox-slider">
					<input
						:id="key"
						autocomplete="off"
						class="checkbox-slider"
						type="checkbox"
						:name="key"
						:checked="options[key] as boolean"
					/>
					<div class="checkbox-groove"></div>
					<!-- <label class="checkbox-slider" :for="key"></label> -->
				</div>
			</div>
			<div v-else-if="optionsStore.getType(key) === 'select'">
				<select
					:id="key"
					:name="key"
					@change="
						event =>
							optionsStore.setValue(
								key,
								(event.target as HTMLSelectElement).value
							)
					"
				>
					<option
						v-for="option in optionsStore.getChoices(key)"
						:key="option"
						:value="option"
						:selected="options[key] === option"
					>
						{{ option }}
					</option>
				</select>
			</div>
			<div v-else-if="optionsStore.getType(key) === 'number'">
				<input
					:id="key"
					:name="key"
					type="number"
					:value="options[key]"
					:min="optionsStore.getRange(key)[0]"
					:max="optionsStore.getRange(key)[1]"
					@change="
						event =>
							optionsStore.setValue(
								key,
								(event.target as HTMLInputElement).value
							)
					"
				/>
			</div>
			<div v-else-if="optionsStore.getType(key) === 'color'">
				<input
					:id="key"
					:name="key"
					type="color"
					:value="options[key]"
					:style="{ cursor: 'pointer' }"
					@change="
						event =>
							optionsStore.setValue(
								key,
								(event.target as HTMLInputElement).value
							)
					"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped>
div.flex {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

div.flex-row {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 0.5rem;
}

.checkbox-groove {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: #ababab;
	border-radius: 20px;
	transition: all 0.3s ease;
}

.checkbox-groove:after {
	position: absolute;
	content: "";
	width: 28px;
	height: 28px;
	border-radius: 50%;
	background-color: #fff;
	top: 1px;
	left: 1px;
	transition: all 0.3s ease;
}

.checkbox-slider {
	position: relative;
	display: block;
	width: 60px;
	height: 30px;
	cursor: pointer;
}

input.checkbox-slider {
	display: none;
}

input:checked + .checkbox-groove {
	background-color: #5fcf80;
}

input:checked + .checkbox-groove:after {
	transform: translateX(30px);
}

label {
	position: absolute;
	left: 0;
	top: 0;
}

input,
select {
	min-height: 100%;
}
</style>
