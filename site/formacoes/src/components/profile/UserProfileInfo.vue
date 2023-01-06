<template>
    <div ref="userProfileTop" class="user-profile-info">
        <div>
            <img class="profile-image" :src="this.imageUrl">
            <div ref="profileInfoArea" class="profile-info-area">
                <p>{{ this.user.username }}</p>
                <p>{{ this.user.name }}</p>
                <p>{{ this.user.description }}</p>
            </div>
            <div ref="profileEditingArea" class="profile-edit-area d-none">
                <div>
                    <div>
                        <p>Username</p>
                        <input type="text" name="username" id="username" v-model="this.user.username" autocomplete="off">
                    </div>
                    <div>
                        <p>Nome</p>
                        <input type="text" name="name" id="name" v-model="this.user.name" autocomplete="off">
                    </div>
                </div>
                <div>
                    <div>
                        <p>Descrição</p>
                        <textarea name="description" id="description" v-model="this.user.description"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <button ref="editProfileButton" v-on:click="editProfile">EDITAR</button>
        <button ref="saveProfileButton" class="d-none" v-on:click="saveProfile">GUARDAR</button>
    </div>
</template>

<script>
export default {
    name: 'UserProfileInfo',
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            countryOpen: false,
            imageUrl: "",
            country: this.user.country
        }
    },
    created(){
        this.imageUrl = new URL(`../../assets/${this.user.image}.jpg`, import.meta.url).href;
    },
    watch: {
        country: function() {
            this.$emit("changeCountry", this.country);
        }
    },  
    methods: {
        editProfile() {
            this.$refs.editProfileButton.classList.add("d-none");
            this.$refs.saveProfileButton.classList.remove("d-none");

            this.$refs.profileInfoArea.classList.add("d-none");
            this.$refs.profileEditingArea.classList.remove("d-none");

            this.$refs.userProfileTop.classList.add("edit");
        },
        saveProfile() {
            this.$refs.editProfileButton.classList.remove("d-none");
            this.$refs.saveProfileButton.classList.add("d-none");

            this.$refs.profileInfoArea.classList.remove("d-none");
            this.$refs.profileEditingArea.classList.add("d-none");

            this.$refs.userProfileTop.classList.remove("edit");

            this.$emit('alterar-dados', this.user); 
        },
        selectCountry(country) {
            this.user.country = country;
            this.countryOpen = false;
        }
    }
}
</script>

<style scoped>
    .user-profile-info {
        display: flex;
        justify-content: space-between;
        align-items: end;
        background-color: var(--mobalytics-card);
        padding: 20px 64px;
        width: 60%;
        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
        margin-bottom: 32px;
    }

    .user-profile-info.edit {
        width: 75%;
    }

    .user-profile-info > div {
        display: flex;
    }

    .profile-info-area {
        padding: 12px 0px;
        margin-right: 24px;
    }

    .profile-info-area p {
        color: var(--light);
        vertical-align: center;
    }

    .profile-info-area p:first-child {
        color: var(--primary);
        font-size: 22px;
    }

    .profile-info-area p:last-child {
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .profile-image {
        height: 180px;
        width: 180px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 48px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .profile-edit-area {
        display: flex;
        gap: 24px;
    }

    .profile-edit-area p {
        margin-bottom: 4px;
        color: var(--light);
    }

    .profile-edit-area input {
        border: none;
        padding: 4px 16px;
        margin-bottom: 16px;
        border-radius: 8px;
        color: var(--light);
        background-color: var(--mobalytics-back);
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .profile-edit-area input:focus {
        outline: none;
    }

    .profile-edit-area textarea {
        border: none;
        padding: 4px 16px;
        margin-bottom: 16px;
        border-radius: 8px;
        width: 500px;
        height: 140px;
        color: var(--light);
        background-color: var(--mobalytics-back);
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
        resize: none;
    }

    .profile-edit-area textarea:focus {
        outline: none;
        width: 500px;
    }

    button {
        background: var(--mobalytics-back);
        color: var(--light);
        height: 50px;
        min-width: 120px;
        border: none;
        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 6px 6px 4px 4px;
    }

    /* 

        SELECT

    */

    .custom-select {
        position: relative;
        width: 218px;
        text-align: left;
        height: 32px;
        line-height: 32px;
        margin-bottom: 16px;
    }

    .custom-select .selected {
        background-color: var(--mobalytics-back);
        border-radius: 8px;
        color: var(--light);
        padding-left: 1em;
        cursor: pointer;
        margin-bottom: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .custom-select .selected:after {
        position: absolute;
        content: "";
        top: 14px;
        right: 1em;
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-color: var(--light) transparent transparent transparent;
    }

    .custom-select .items {
        color: var(--light);
        border-radius: 8px;
        overflow: hidden;
        position: absolute;
        background-color: var(--mobalytics-back);
        left: 0;
        right: 0;
        z-index: 1;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
        max-height: 300px;
    }

    .custom-select .items::-webkit-scrollbar {
        width: 10px;
        background: var(--mobalytics-card);
        border-radius: 8px;
    }

    .custom-select .items::-webkit-scrollbar-thumb {
        background: var(--mobalytics-back);
        border-radius: 8px;
    }

    .custom-select .items div {
        padding-left: 1em;
        cursor: pointer;
    }

    .custom-select .items div:hover {
        background-color: var(--mobalytics-card);
    }

    .selectHide {
        display: none;
    }
</style>