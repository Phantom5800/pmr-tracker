<script setup lang="ts"></script>

<template>
	<div class="info-block">
		<div>Tracker Usage:</div>
		<ul>
			<li>
				Make sure to mark the Boots and Hammer if you start with them, as the
				tracker assumes you don't.
			</li>
			<li>
				Left clicking on any object toggles whether or not they are collected.
			</li>
			<li>
				Left clicking on a key or upgrade (boots/hammer) increments the counter,
				right clicking will decrement the counter.
			</li>
			<li>
				Star Spirits will highlight when all the requirements to acquire them
				glitchlessly are met, as will the Star Rod.
			</li>
			<li>
				Right clicking on a Star Spirit will increment a number from 1-7, that
				can be useful for tracking chapter difficulty with the "shuffle
				chapters" option in seeds.
			</li>
			<li>
				Right clicking on various "optional" items will add a checkmark to them,
				this can be used to signify that they have been turned in. This will
				mark the respective checks in the map tracker as well.
			</li>
			<li>
				This site uses localstorage to remember your settings and progress! Some
				browsers or plugins may disable this when you disable cookies as well.
				This won't break anything, but you will have to manually re-enter your
				settings each time and will lose progress if you refresh the page.
			</li>
			<li>
				For suggestions and feature requests, please make issues on
				<a href="https://github.com/Phantom5800/pmr-tracker" target="_blank"
					>Github</a
				>! If you don't have a Github, you can also reach out on any of the
				social media in the footer.
			</li>
			<li>
				This is just a tracker, to generate a seed and play yourself, head over
				to
				<a href="https://pm64randomizer.com/" target="_blank"
					>https://pm64randomizer.com/</a
				>
			</li>
		</ul>
	</div>
</template>

<style scoped>
div.info-block {
	width: 34em;
	margin: 10px 10px 10px 10px;
	color: white;
}
ul {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
</style>
