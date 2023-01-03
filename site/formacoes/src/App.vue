<template>
  <div class="app" v-on:click="closeModals">
	<Sidebar class="sidebar" v-on:toggleSidebar="toggleSidebar" :class="{ 'd-none': displaySidebarTopbar }"/>
	<div class="full-page">
		<div class="topbar-wrapper" :class="{ sidebarTopbar: sidebarOpen, 'd-none': displaySidebarTopbar }">
			<Topbar v-bind:notifsOpen="notifsOpen" v-bind:searchOpen="searchOpen" v-on:toggleNotifs="toggleNotifs" v-on:toggleSearch="toggleSearch" v-on:openSearch="openSearch"/>
		</div>
		<router-view  class="active-page" :class="{ sidebarMainPage: sidebarOpen }"/>	
	</div>
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
			sidebarOpen: false,
			searchOpen: false,
			notifsOpen: false
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
		},
		toggleNotifs() {
			this.notifsOpen = !this.notifsOpen;
		},
		toggleSearch() {
			this.searchOpen = !this.searchOpen;
		},
		openSearch() {
			this.searchOpen = true;
			this.notifsOpen = false;
		},
		closeModals() {
			this.notifsOpen = false;
			this.searchOpen = false;
		}
	} 
}
</script>

<style lang="scss">
	:root {
		//--primary: #4ade80;
		--primary: #f78834;
		--primary-alt: rgb(69, 115, 117);
		--grey: #64748b;
		//--dark: #1e293b;
		--dark: #15273F;
		--back-dark: #0D1A2D;
		--dark-alt: #334155;
		--light: #f1f5f9;
		--light-alt: #8BACD9;
		--sidebar-width: 300px;
		//cock
		--mobalytics-back: #34345f;
		--mobalytics-card: #202045;
		--mobalytics-susge: #181836;
	}

	body::-webkit-scrollbar {
        width: 10px;
        background: var(--mobalytics-back);
    }

    body::-webkit-scrollbar-thumb {
        background: var(--mobalytics-susge);
		border-radius: 8px;
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
		padding: 16px 40px 8px 104px;
		z-index: 1;
		transition: 0.3s ease-in-out;
		width: 100%;
		background: var(--mobalytics-back);
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
		background: var(--mobalytics-back);
		min-height: 100vh;

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