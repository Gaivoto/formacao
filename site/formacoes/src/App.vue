<template>
  <div class="app">
	<Sidebar/>
	<div class="active-page">
		<Topbar/>
		<router-view/>	
	</div>
	<!--adicionar o sidebar em cima do topbar-->
  </div>
</template>

<script setup>
import Topbar from './components/Topbar.vue'
import Sidebar from './components/Sidebar.vue'	
</script>

<style lang="scss">
:root {
	//--primary: #4ade80;
	--primary: #00ADB5;
	--grey: #64748b;
	//--dark: #1e293b;
	--dark: #222831;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 300px;
}

* {
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}

.active-page {
	width: 100%;
}

body {
	background: var(--light);
	margin: 0;
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

.app {
	display: flex;

	main {
		flex: 1 1 0;
		padding: 2rem;
		@media (max-width: 1024px) {
			padding-left: 6rem;
		}
	}
}
</style>
