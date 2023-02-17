<template>
  <div class="app" v-on:click="this.closeModals">
	<Sidebar class="sidebar" v-if="this.displaySidebarTopbar && this.isUserLogged" v-on:toggleSidebar="this.toggleSidebar"/>
	<div class="full-page">
		<div class="topbar-wrapper" v-if="this.displaySidebarTopbar" :class="{ topbarSpaceOpenSidebar: this.sidebarOpen, topbarSpaceNoSidebar: !this.isUserLogged }">
			<Topbar v-if="this.displaySidebarTopbar" v-bind:notifsOpen="this.notifsOpen" v-bind:searchOpen="this.searchOpen" v-on:toggleNotifs="this.toggleNotifs" v-on:toggleSearch="this.toggleSearch" v-on:openSearch="this.openSearch"/>
		</div>
		<router-view class="active-page" :class="{ mainpageSpaceOpenSidebar: this.sidebarOpen, mainpageSpaceClosedSidebar: !this.isLanding && this.isUserLogged }" v-bind:sidebar="this.sidebarOpen" v-on:open-modal="this.openMessageModal"/>	
	</div>
	<MessageModal v-if="this.messageModalOpen" v-bind:msg="this.modalMessage" v-on:close-modal="this.closeMessageModal" />
  </div>
</template>

<script>
import Topbar from './components/Topbar.vue'
import Sidebar from './components/Sidebar.vue'
import MessageModal from './components/MessageModal.vue';

export default {
	components: {
		Topbar,
		Sidebar,
		MessageModal
	},
	data() {
		return {
			sidebarOpen: false,
			searchOpen: false,
			notifsOpen: false,
			messageModalOpen: false,
			modalMessage: ""
		}
	},
	computed: {
		displaySidebarTopbar() {
			if(this.$route.name == "Landing" || this.$route.name == "Login") return false;
			return true;
		},
		isLanding() {
			if(this.$route.name == "Landing") return true;
			return false; 
		},
		isUserLogged() {
			if(this.$store.getters.getUser.id) return true;
			return false;
		}
	},
	methods: {
		toggleSidebar() {
			this.sidebarOpen = !this.sidebarOpen;
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
		},
		openMessageModal(msg) {
			this.modalMessage = msg;
			this.messageModalOpen = true;
		},
		closeMessageModal() {
			this.messageModalOpen = false;
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

	.topbar-wrapper > * {
		min-height: 64px;
	}

	.topbarSpaceNoSidebar {
		padding-left: 40px;
	}

	.full-page {
		width: 100%;
	}

	.active-page {
		margin-top: 82px;
		transition: 0.3s ease-in-out;
	}

	.mainpageSpaceClosedSidebar {
		margin-left: 64px;
	}

	.topbarSpaceOpenSidebar {
		padding-left: 340px !important;
		transition: 0.3s ease-in-out;
	}

	.mainpageSpaceOpenSidebar {
		margin-left: 300px;
		transition: 0.3s ease-in-out;
	}

	body {
		background: var(--light);
		margin: 0;
	}

	@media (max-width: 1024px) {
		.topbarSpaceOpenSidebar {
			padding-left: 72px !important;
		}

		.mainpageSpaceOpenSidebar {
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
</style>