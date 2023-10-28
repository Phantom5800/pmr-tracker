<script setup lang="ts">
defineEmits(["close"]);

function getImageUrl(image: string) {
	return new URL(`../assets/images/${image}`, import.meta.url).href;
}
</script>

<template>
	<div class="info-block">
		<img id="logo-img" :src="getImageUrl('Logo.png')" />
		<p>by Phantom5800 and scatter</p>
		<ul>
			<li>
				This is just a tracker. To generate a seed and play yourself, head over
				to
				<a href="https://pm64randomizer.com/" target="_blank"
					>https://pm64randomizer.com/</a
				>
			</li>
			<li>
				Click the Import Seed button in the top bar and paste in the ID from the
				pm64randomizer.com URL to import your seed settings. This will filter
				certain items and map checks based on the seed logic.
			</li>
			<li>
				Left clicking on any object toggles whether or not they are collected.
			</li>
			<li>
				Left clicking on the Boots, Hammer, or an item which you can get
				multiples of increments the counter. Right clicking will decrement the
				counter.
			</li>
			<li>
				Star Spirits will highlight when all the requirements to acquire them
				glitchlessly are met, as will the Star Rod.
			</li>
			<li>
				Right clicking on a Star Spirit will allow you to set a chapter scaling
				number from 1-7 and set an icon to track which dungeon is where in
				Dungeon Shuffle.
			</li>
			<li>
				Right clicking on a partner will allow you to track whether you've
				upgraded them, and to which rank.
			</li>
			<li>
				Right clicking on various "optional" items will add a checkmark to them,
				which you can use to signify that they have been turned in. This will
				mark the respective checks in the map tracker as well.
			</li>
			<li>
				Click "Edit Layout" in the top bar to drag, resize, add and remove the
				tracker panels. Your layout is saved automatically.
			</li>
			<li>
				For suggestions and feature requests, please make issues on
				<a href="https://github.com/Phantom5800/pmr-tracker" target="_blank"
					>Github</a
				>! If you don't have a Github, you can also reach out on any of the
				social media in the footer.
			</li>
			<li>To see this message again, click "How to Use" in the top bar.</li>
			<button @click="$emit('close')">Get started</button>
		</ul>
	</div>
</template>

<style scoped>
div.info-block {
	margin: 10px 10px 10px 10px;
	color: white;
	font-size: 1.5rem;
	max-width: 80ch;
	display: flex;
	flex-direction: column;
	align-items: center;
}

#logo-img {
	width: 50%;
}

p {
	font-size: 1.2rem;
	margin-top: -1rem;
}

ul {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

a {
	color: white;
}

button {
	font-size: 1.8rem;
}
</style>
