<script setup lang="ts">
import { useOptions } from "@/stores/config";
import { storeToRefs, defineStore } from "pinia";
import { ref } from "vue";

const optionsStore = useOptions();

const { options } = storeToRefs(optionsStore);

const props = defineProps<{
	isOpen: boolean;
	optionsKeys: string[];
}>();
</script>

<template>
	<div :class="[{ 'options-open': props.isOpen }, 'panel']">
		<table>
			<tr
				v-for="key in optionsKeys"
				:key="key"
				@click="
					optionsStore.getType(key) === 'boolean' && optionsStore.toggle(key)
				"
			>
				<td class="option-name" colspan="3">{{ optionsStore.getName(key) }}</td>
				<td v-if="optionsStore.getType(key) === 'boolean'" class="option">
					<div class="checkbox-slider">
						<input
							autocomplete="off"
							class="checkbox-slider"
							:id="key"
							type="checkbox"
							:name="key"
							:checked="options[key]"
						/>
						<div class="checkbox-groove"></div>
						<!-- <label class="checkbox-slider" :for="key"></label> -->
					</div>
				</td>
				<td v-else-if="optionsStore.getType(key) === 'select'">
					<select
						:name="key"
						:id="key"
						@change="(event) => optionsStore.setValue(key, event.target.value)"
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
				</td>
				<td v-else-if="optionsStore.getType(key) === 'number'">
					<input
						:name="key"
						:id="key"
						type="number"
						:value="options[key]"
						@change="(event) => optionsStore.setValue(key, event.target.value)"
					/>
				</td>
			</tr>
		</table>
	</div>
</template>

<style scoped>
div.panel {
	background-color: darkblue;
	color: white;
	margin: 5px 5px 5px 5px;
	padding: 5px 5px 5px 5px;
	font-size: 1.5em;
	position: absolute;
	left: -600px;
	top: 58px;
	width: 500px;
	transition: 0.4s;
}

div.panel.options-open {
	-webkit-transform: translate(608px);
	transform: translate(608px);
}

table {
	width: 100%;
}

td.option-name {
	text-align: left;
	padding-left: 10px;
}

tr:hover td.option-name {
	text-decoration: underline;
}

td.option {
	width: 60px;
	text-align: right;
	padding-top: 5px;
	padding-bottom: 5px;
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
</style>
