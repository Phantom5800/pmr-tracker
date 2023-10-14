<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
import Main from "./components/Main.vue";
import MenuOptions from "./components/MenuOptions.vue";
import EnabledSettings from "./components/EnabledSettings.vue";
import InfoBlocks from "./components/InfoBlocks.vue";
import { configKeys, settingsKeys } from "./stores/config";
import MainTracker from "./components/MainTracker.vue";
import MapTracker from "./components/MapTracker.vue";
import LetterTracker from "./components/LetterTracker.vue";
import Notes from "./components/Notes.vue";

const configOpen = ref(false);
const settingsOpen = ref(false);

const year = new Date().getFullYear();
</script>

<template>
	<header>
		<div style="display: flex">
			<div
				id="options-menu-toggle"
				:class="{ 'options-open': settingsOpen }"
				class="hamburger"
				@click="
					settingsOpen = !settingsOpen;
					configOpen = false;
				"
			>
				<div class="hamburger-1"></div>
				<div class="hamburger-2"></div>
				<div class="hamburger-3"></div>
			</div>
			<img id="logo-img" src="./assets/images/Logo.png" />
		</div>
		<div
			id="settings-menu-toggle"
			:class="{ 'options-open': configOpen }"
			@click="
				configOpen = !configOpen;
				settingsOpen = false;
			"
		>
			&#x2699;
		</div>
	</header>

	<main>
		<EnabledSettings />
		<Notes />
		<MainTracker />
		<!-- <InfoBlocks /> -->
		<MapTracker />
		<LetterTracker />
	</main>

	<MenuOptions :isOpen="configOpen" :optionsKeys="configKeys" />
	<MenuOptions :isOpen="settingsOpen" :optionsKeys="settingsKeys" />

	<footer>
		<a href="https://twitter.com/Phantom5800" target="_blank"
			><img
				width="15px"
				src="https://resources.phantom-games.com/TwitterLogo.png"
			/>
			@Phantom5800</a
		>
		&bull;
		<a href="https://www.twitch.tv/phantom5800" target="_blank"
			><img
				width="15px"
				src="https://resources.phantom-games.com/TwitchLogo.png"
			/>
			Phantom5800</a
		>
		&bull;
		<a href="https://www.youtube.com/@PhantomVODs" target="_blank"
			><img
				width="15px"
				src="https://resources.phantom-games.com/YoutubeLogo.png"
			/>
			@PhantomVODs</a
		>
		&bull;
		<a href="https://github.com/Phantom5800" target="_blank">Github</a>
		&bull;&copy;
		<a href="https://phantom-games.com/" target="_blank"
			>Phantom Games {{ year }}</a
		>
	</footer>
</template>

<style scoped>
header {
	padding-top: 5px;
	margin: 5px 5px 5px 5px;
	display: flex;
	flex-direction: row;
	width: 100%;
	display: flex;
	justify-content: space-between;
}

footer {
	width: 100%;
	display: inline-block;
	text-align: center;
	color: white;
	font-size: 0.8em;
}

#logo-img {
	height: 40px;
	cursor: unset;
	padding-left: 7.5em;
}

#settings-menu-toggle {
	cursor: pointer;
	padding-right: 1em;
	color: black;
	font-size: 35px;
	font-weight: bold;
	-webkit-text-stroke-width: 0.125px;
	-webkit-text-stroke-color: gainsboro;
}

#settings-menu-toggle.options-open {
	color: gainsboro;
	-webkit-text-stroke-color: black;
}

.hamburger {
	cursor: pointer;
	width: 40px;
}

.hamburger-1,
.hamburger-2,
.hamburger-3 {
	width: 35px;
	height: 3px;
	background-color: black;
	margin: 6px 0;
	transition: 0.4s;
	border-color: gainsboro;
	border-width: 1px;
	border-style: solid;
}

.options-open .hamburger-1 {
	-webkit-transform: rotate(-45deg) translate(-9px, 6px);
	transform: rotate(-45deg) translate(-9px, 6px);
}

.options-open .hamburger-2 {
	opacity: 0;
}

.options-open .hamburger-3 {
	-webkit-transform: rotate(45deg) translate(-8px, -8px);
	transform: rotate(45deg) translate(-8px, -8px);
}
</style>
