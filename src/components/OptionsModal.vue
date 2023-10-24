<script setup lang="ts"></script>

<template>
	<div class="mask">
		<div class="modal"></div>
	</div>
</template>

<style scoped>
div.mask {
	position: fixed;
	z-index: 9998;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
	transition: opacity 0.3s;
	display: grid;
	place-items: center;
}

div.modal {
	padding: 2rem;
	height: 20rem;
	width: 16rem;
	background-color: blue;
	border-radius: 12px;
	box-shadow: 0px 0px 20px 12px black;
}
</style>
