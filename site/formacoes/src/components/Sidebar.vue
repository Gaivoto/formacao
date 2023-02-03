<template>
  <aside :class="{ isExpanded: is_expanded }" >
    <router-link class="logo" to="/home">
        <img src="../assets/vue.svg" alt="Vue">
	</router-link>

    <div class="menu-toggle-wrap">
        <button class="menu-toggle" v-on:click="toggleMenu">
            <span class="material-icons">clear_all</span>
        </button>
    </div>

    <h3>Menu</h3>
    <div class="menu">
        <router-link class="button" to="/courses">
            <span class="material-icons">library_books</span>
            <span class="text">Cursos</span>
        </router-link>
        <router-link class="button" :to="{ name: 'Conteúdo', params: { id: this.$store.getters.getUser.id } }">
            <span class="material-icons">home</span>
            <span class="text">Home</span>
        </router-link>
        <router-link class="button" :to="{ name: 'Perfil do Utilizador', params: { id: this.$store.getters.getUser.id } }">
            <span class="material-icons">group</span>
            <span class="text">Team</span>
        </router-link>
        <router-link class="button" to="/courselist">
            <span class="material-icons">email</span>
            <span class="text">Contact Us</span>
        </router-link>
        <router-link class="button" to="/users">
            <span class="material-icons">email</span>
            <span class="text">Lista de Utilizadores</span>
        </router-link>
    </div>

    <div class="flex"></div>
		 
	<div class="menu">
		<router-link to="/settings" class="button">
			<span class="material-icons">settings</span>
			<span class="text">Settings</span>
		</router-link>
	</div>
  </aside>
</template>

<script>
export default {
	data() {
		return {
			is_expanded: false
		}
	},
	methods: {
		toggleMenu() {
			this.is_expanded = !this.is_expanded;
			this.$emit("toggleSidebar");
		}
	}
}
</script>

<style lang="scss" scoped>
aside {
	display: flex;
	flex-direction: column;
	width: calc(2rem + 32px);
	overflow: hidden;
	min-height: 100vh;
	padding: 32px 1rem 1rem 1rem;
	transition: 0.3s ease-in-out;
	margin: 0;
	min-width: 64px;
    box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
	
	background: var(--mobalytics-susge);

	.flex {
		flex: 1 1 0%;
	}

	.logo {
		margin-bottom: 24px;
		img {
			width: 2rem;
		}
	}

	.menu-toggle-wrap {
		display: flex;
		justify-content: flex-end;
		position: relative;
		top: 0;
		transition: 0.3s ease-in-out;

		.menu-toggle {
			padding: 0;
			transition: 0.3s ease-in-out;
			height: 28px;

			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.3s ease-out;
			}
			
			&:hover {
				.material-icons {
					color: var(--primary);
					transform: translateX(0.5rem);
				}
			}
		}
	}

	button {
		cursor: pointer;
		appearance: none;
		border: none;
		outline: none;
		background: none;
	}

	h3, .button .text {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	h3 {
		color: var(--grey);
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		margin-top: 0;
		text-transform: uppercase;
	}

	.menu {
		margin: 0 -1rem;

		.button {
			display: flex;
			align-items: center;
			text-decoration: none;
			transition: 0.3s ease-in-out;
			padding: 0.5rem 1rem;
			height: 48px;

			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.3s ease-in-out;
			}

			.text {
				color: var(--light);
				transition: 0.1s ease-in-out;
			}

			&:hover {
				background-color: var(--mobalytics-back);
				.material-icons, .text {
					color: var(--primary);
				}
			}

			&.router-link-exact-active {
				background-color: var(--mobalytics-back);
				border-right: 5px solid var(--primary);
				.material-icons, .text {
					color: var(--primary);
				}
			}
		}
	}

	.footer {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;

		p {
			font-size: 0.875rem;
			color: var(--grey);
		}
	}

	&.isExpanded {
		width: var(--sidebar-width);
		min-width: 300px;

		.menu-toggle-wrap {
			top: -3rem;
			
			.menu-toggle {
				transform: rotate(-180deg);
			}
		}

		h3, .button .text {
			opacity: 1;
		}

		.button {
			.material-icons {
				margin-right: 1rem;
			}

            .text {
                transition: 0.5s ease-in-out;
            }
		}

		.footer {
			opacity: 0;
		}
	}
}
</style>