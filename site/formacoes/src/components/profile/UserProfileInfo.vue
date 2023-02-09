<template>
    <div ref="userProfileTop" class="user-profile-info" :class="{ 'edit-mode': this.editMode }">
        <div>
            <img class="profile-image" :src="this.imageUrl" />
            <div ref="profileInfoArea" class="profile-info-area" :class="{ 'd-none': this.editMode }">
                <p>{{ this.user.username }}</p>
                <p>{{ this.user.name }}</p>
                <p v-if:="ownProfile">{{ this.user.email }}</p>
                <p>{{ this.user.description }}</p>
            </div>
            <div ref="profileEditingArea" class="profile-edit-area" :class="{ 'd-none': !this.editMode }" v-if="this.ownProfile">
                <div>
                    <div>
                        <p>Nome</p>
                        <input ref="nameInput" type="text" name="name" id="name" v-model="this.user.name" autocomplete="off"/>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Descrição</p>
                        <textarea ref="descriptionInput" name="description" id="description" v-model="this.user.description"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <button ref="editProfileButton" v-on:click="this.editMode = true" :class="{ 'd-none': this.editMode }" v-if="this.ownProfile">EDITAR</button>
        <button ref="saveProfileButton" v-on:click="commitUserChanges" :class="{ 'd-none': !this.editMode }" v-if="this.ownProfile">GUARDAR</button>
    </div>
</template>

<script>
export default {
    name: "UserProfileInfo",
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            imageUrl: "",
            editMode: false,
        };
    },
    created() {
        this.imageUrl = new URL(`../../assets/${this.user.image}.jpg`, import.meta.url).href;
    },
    computed: {
        ownProfile() {
            return (this.$route.params.id == this.$store.getters.getUser.id);
        }
    },
    methods: {
        commitUserChanges() {
            let info = {
                name: this.$refs.nameInput.value,
                description: this.$refs.descriptionInput.value,
            };

            this.editMode = false;
            this.$emit("alterar-dados", info);
        }
    }
};
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

    .user-profile-info.edit-mode {
        width: 100%;
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
        width: 300px;
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
        margin-bottom: 20px;
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

    @media (max-width: 1500px) {
        .user-profile-info {
            width: 70%;
        }

        .user-profile-info.edit-mode textarea {
            width: 400px;
        }
    }

    @media (max-width: 1300px) {
        .user-profile-info.edit-mode .profile-edit-area {
            display: block;
        }
    }

    @media (max-width: 1250px) {
        .user-profile-info {
            width: 80%;
        }
    }

    @media (max-width: 1150px) {
        .user-profile-info {
            width: 90%;
        }
    }

    @media (max-width: 1100px) {
        .user-profile-info.edit-mode > div {
            display: block;
        }

        .user-profile-info.edit-mode .profile-image {
            margin-bottom: 32px;
        }

        .user-profile-info.edit-mode textarea {
            margin-bottom: 0px;
        }

        .user-profile-info.edit-mode button {
            margin-bottom: 8px;
        }
    }

    @media (max-width: 1050px) {
        .user-profile-info {
            width: 100%;
        }
        .user-profile-info {
            padding: 20px 32px;
        }

        .profile-image {
            margin-right: 24px;
        }

        .profile-info-area p:last-child {
            width: 240px;
        }
    }

    @media (max-width: 750px) {
        .user-profile-info > div {
            display: block;
        }

        .profile-image {
            margin-bottom: 32px;
        }
    }

    @media (max-width: 750px) {
        .user-profile-info.edit-mode {
            display: block;
        }

        .user-profile-info.edit-mode textarea {
            margin-bottom: 24px;
        }
    }

    @media (max-width: 575px) {
        .user-profile-info.edit-mode textarea {
            width: 100%;
        }
    }

    @media (max-width: 550px) {
        .user-profile-info {
            display: block;
        }
    }

    @media (max-width: 500px) {
        .profile-info-area p:last-child {
            width: 200px;
        }
    }
</style>