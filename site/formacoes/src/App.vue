<template>
  <div class="app">
	<Sidebar class="sidebar" v-on:toggleSidebar="toggleSidebar" :class="{ 'd-none': displaySidebarTopbar }"/>
	<div class="full-page">
		<div class="topbar-wrapper" :class="{ sidebarTopbar: sidebarOpen, 'd-none': displaySidebarTopbar }">
			<Topbar/>
		</div>
		<router-view  class="active-page" :class="{ sidebarMainPage: sidebarOpen }"/>	
	</div>
	<!--adicionar o sidebar em cima do topbar-->
  </div>
</template>

<script>
import Topbar from './components/Topbar.vue'
import Sidebar from './components/Sidebar.vue'

export default {
	components: {
		Topbar,
		Sidebar
	},
	data() {
		return {
			sidebarOpen: false
		}
	},
	computed: {
		displaySidebarTopbar() {
			if(!this.$route.name || this.$route.name == "Login") return true;
			return false;
		}
	},
	methods: {
		toggleSidebar() {
			this.sidebarOpen = !this.sidebarOpen;
			this.$emit("toggleSidebar");
		}
	}
}
</script>

<style lang="scss">
:root {
	//--primary: #4ade80;
	--primary: #00ADB5;
	--primary-alt: rgb(69, 115, 117);
	--grey: #64748b;
	//--dark: #1e293b;
	--dark: #15273F;
	--back-dark: #0D1A2D;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--light-alt: #8BACD9;
	--sidebar-width: 300px;
}

* {
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}

.sidebar {
	position: fixed;
	z-index: 2;
}

.topbar-wrapper {
	position: fixed;
	padding: 16px 40px 16px 104px;
	z-index: 1;
	transition: 0.3s ease-in-out;
	width: 100%;
	background-color: var(--back-dark);
}

.full-page {
	width: 100%;
}

.active-page {
	margin-left: 64px;
	margin-top: 82px;
	transition: 0.3s ease-in-out;
}

.sidebarTopbar {
	padding-left: 340px !important;
	transition: 0.3s ease-in-out;
}

.sidebarMainPage {
	margin-left: 300px;
	transition: 0.3s ease-in-out;
}

body {
	background: var(--light);
	margin: 0;
}

@media (max-width: 1024px) {
	.sidebarTopbar {
		padding-left: 72px !important;
	}

	.sidebarMainPage {
		margin-left: 0px;
	}	
}

.app {
	display: flex;
	background-color: var(--back-dark);

	main {
		flex: 1 1 0;
		padding: 2rem;
		@media (max-width: 1024px) {
			padding-left: 6rem;
		}
	}
}

a {
	text-decoration: none !important;
}
</style>