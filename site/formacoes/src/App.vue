<template>
<<<<<<< HEAD
  <div class="app" v-on:click="closeModals">
	<Sidebar class="sidebar" v-on:toggleSidebar="toggleSidebar" :class="{ 'd-none': displaySidebarTopbar }"/>
	<div class="full-page">
		<div class="topbar-wrapper" :class="{ sidebarTopbar: sidebarOpen, 'd-none': displaySidebarTopbar }">
			<Topbar v-bind:notifsOpen="notifsOpen" v-bind:searchOpen="searchOpen" v-on:toggleNotifs="toggleNotifs" v-on:toggleSearch="toggleSearch" v-on:openSearch="openSearch"/>
		</div>
		<router-view  class="active-page" :class="{ sidebarMainPage: sidebarOpen }"/>	
	</div>
=======
  <div class="app" v-on:click="this.closeModals">
	<Sidebar class="sidebar" v-if="this.displaySidebarTopbar && this.isUserLogged" v-on:toggleSidebar="this.toggleSidebar"/>
	<div class="full-page">
		<div class="topbar-wrapper" v-if="this.displaySidebarTopbar" :class="{ topbarSpaceOpenSidebar: this.sidebarOpen, topbarSpaceNoSidebar: !this.isUserLogged }">
			<Topbar v-if="this.displaySidebarTopbar" v-bind:notifsOpen="this.notifsOpen" v-bind:searchOpen="this.searchOpen" v-on:toggleNotifs="this.toggleNotifs" v-on:toggleSearch="this.toggleSearch" v-on:openSearch="this.openSearch"/>
		</div>
		<router-view class="active-page" :class="{ mainpageSpaceOpenSidebar: this.sidebarOpen, mainpageSpaceClosedSidebar: !this.isLanding && this.isUserLogged }" v-bind:sidebar="this.sidebarOpen" v-on:open-modal="this.openMessageModal" v-on:close-sidebar="this.closeSidebar"/>	
	</div>
	<MessageModal v-if="this.messageModalOpen" v-bind:msg="this.modalMessage" v-on:close-modal="this.closeMessageModal" />
>>>>>>> origin/development
  </div>
</template>

<script>
import Topbar from './components/Topbar.vue'
import Sidebar from './components/Sidebar.vue'
<<<<<<< HEAD
=======
import MessageModal from './components/MessageModal.vue';
>>>>>>> origin/development

export default {
	components: {
		Topbar,
<<<<<<< HEAD
		Sidebar
=======
		Sidebar,
		MessageModal
>>>>>>> origin/development
	},
	data() {
		return {
			sidebarOpen: false,
			searchOpen: false,
<<<<<<< HEAD
			notifsOpen: false
=======
			notifsOpen: false,
			messageModalOpen: false,
			modalMessage: ""
>>>>>>> origin/development
		}
	},
	computed: {
		displaySidebarTopbar() {
<<<<<<< HEAD
			if(!this.$route.name || this.$route.name == "Login") return true;
=======
			if(this.$route.name == "Landing" || this.$route.name == "Login") return false;
			return true;
		},
		isLanding() {
			if(this.$route.name == "Landing") return true;
			return false; 
		},
		isUserLogged() {
			if(this.$store.getters.getUser.id) return true;
>>>>>>> origin/development
			return false;
		}
	},
	methods: {
		toggleSidebar() {
			this.sidebarOpen = !this.sidebarOpen;
<<<<<<< HEAD
			this.$emit("toggleSidebar");
=======
		},
		closeSidebar() {
			this.sidebarOpen = false;
>>>>>>> origin/development
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
<<<<<<< HEAD
=======
		},
		openMessageModal(msg) {
			this.modalMessage = msg;
			this.messageModalOpen = true;
		},
		closeMessageModal() {
			this.messageModalOpen = false;
>>>>>>> origin/development
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
<<<<<<< HEAD
		//cock
=======
>>>>>>> origin/development
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
<<<<<<< HEAD
		padding: 16px 40px 0px 104px;
=======
		padding: 16px 40px 8px 104px;
>>>>>>> origin/development
		z-index: 1;
		transition: 0.3s ease-in-out;
		width: 100%;
		background: var(--mobalytics-back);
	}

<<<<<<< HEAD
=======
	.topbar-wrapper > * {
		min-height: 64px;
	}

	.topbarSpaceNoSidebar {
		padding-left: 40px;
	}

>>>>>>> origin/development
	.full-page {
		width: 100%;
	}

	.active-page {
<<<<<<< HEAD
		margin-left: 64px;
=======
>>>>>>> origin/development
		margin-top: 82px;
		transition: 0.3s ease-in-out;
	}

<<<<<<< HEAD
	.sidebarTopbar {
=======
	.mainpageSpaceClosedSidebar {
		margin-left: 64px;
	}

	.topbarSpaceOpenSidebar {
>>>>>>> origin/development
		padding-left: 340px !important;
		transition: 0.3s ease-in-out;
	}

<<<<<<< HEAD
	.sidebarMainPage {
=======
	.mainpageSpaceOpenSidebar {
>>>>>>> origin/development
		margin-left: 300px;
		transition: 0.3s ease-in-out;
	}

	body {
		background: var(--light);
		margin: 0;
	}

	@media (max-width: 1024px) {
<<<<<<< HEAD
		.sidebarTopbar {
			padding-left: 72px !important;
		}

		.sidebarMainPage {
=======
		.topbarSpaceOpenSidebar {
			padding-left: 72px !important;
		}

		.mainpageSpaceOpenSidebar {
>>>>>>> origin/development
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
<<<<<<< HEAD
=======

	@media (max-width: 1050px) {
		.topbar-wrapper {
			padding: 16px 16px 8px 80px;
		}

		.topbarSpaceNoSidebar {
			padding-left: 16px;
		}
	}

	@media (max-width: 600px) {
		.topbar-wrapper {
			padding: 16px 8px 8px 72px;
		}

		.topbarSpaceNoSidebar {
			padding-left: 8px;
		}
	}
>>>>>>> origin/development
</style>