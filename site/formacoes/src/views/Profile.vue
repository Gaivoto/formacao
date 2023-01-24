<template>
    <div class="profile-wrapper">
        <UserProfileInfo v-bind:user="this.user" v-on:alterar-dados="alterarDadosUser"/>
        <div class="profile-bottom">
            <div>
                <router-link :to="{ name: 'Meus Cursos', params: { id: 1 } }">Os meus cursos</router-link>
                <div class="profile-list">
                    <UserProfileCourseCard v-for="course in this.courses" :key="course.id" v-bind:course="course"/>
                </div>
            </div>
            <div>
                <router-link :to="{ name: 'Meus Diplomas', params: { id: 1 } }">Os meus diplomas</router-link>
                <div class="profile-list last-list">
                    <UserProfileDiplomaCard v-for="diploma in this.diplomas" :key="diploma.id" v-bind:diploma="diploma"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserProfileInfo from '../components/profile/UserProfileInfo.vue'
import UserProfileCourseCard from '../components/profile/UserProfileCourseCard.vue'
import UserProfileDiplomaCard from '../components/profile/UserProfileDiplomaCard.vue'

export default {
    name: 'Profile',
    components: {
        UserProfileInfo,
        UserProfileCourseCard,
        UserProfileDiplomaCard
    },
    data(){
        return {
            user: {
                username: "",
                name: "",
                description: "",
                image: ""
            },
            courses: [],
            diplomas: []
        }
    },
    created(){
        this.user.username = "Username user",
        this.user.name = "Nome user"
        this.user.description = "description description description description description"
        this.user.image = "bingus"

        this.courses = [
            {
                id: 1,
                name: "Course 1Course 1Course 1Course 1Course 1",
                progress: 32,
                image: "bingus"
            },
            {
                id: 2,
                name: "Course 2",
                progress: 0,
                image: "bingus"
            },
            {
                id: 3,
                name: "Course 3",
                progress: 86,
                image: "bingus"
            }
        ]

        this.diplomas = [
            {
                id: 1,
                name: "Diploma 1Diploma 1Diploma 1Diploma 1Diploma 1",
                image: "bingus"
            },
            {
                id: 2,
                name: "Diploma 2",
                image: "bingus"
            },
            {
                id: 3,
                name: "Diploma 3",
                image: "bingus"
            },
            {
                id: 4,
                name: "Diploma 321",
                image: "bingus"
            },
            {
                id: 5,
                name: "Diploma 321",
                image: "bingus"
            },
            {
                id: 4,
                name: "Diploma 321",
                image: "bingus"
            },
            {
                id: 5,
                name: "Diploma 321",
                image: "bingus"
            },
            {
                id: 4,
                name: "Diploma 321",
                image: "bingus"
            },
            {
                id: 5,
                name: "Diploma 321",
                image: "bingus"
            },
            {
                id: 4,
                name: "Diploma 321",
                image: "bingus"
            },
            {
                id: 5,
                name: "Diploma 321",
                image: "bingus"
            },
            {
                id: 4,
                name: "Diploma 321",
                image: "bingus"
            },
            {
                id: 5,
                name: "Diploma 321",
                image: "bingus"
            }
        ]
    },
    methods: {
        alterarDadosUser() {
            //chamar backend pa alterar dados user
        }
    }
}
</script>

<style scoped>
    .profile-wrapper {
        padding: 24px 48px 0px 48px;
    }

    .profile-bottom {
        background-color: var(--mobalytics-card);
        padding: 16px 0px;
        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .profile-bottom > div > a {
        color: var(--primary);
        font-size: 20px;
        margin-left: 24px;
        margin-bottom: 16px;
    }

    .profile-list {
        display: flex;
        margin: 0px 32px 24px 32px;
        padding-bottom: 16px;
        border-radius: 8px;
        overflow-x: scroll;
        overflow-y: hidden;
    }

    .last-list {
        margin-bottom: 12px;
    }

    .profile-list::-webkit-scrollbar {
        width: 10px;
        background: var(--mobalytics-card);
    }

    .profile-list::-webkit-scrollbar-thumb {
        background: var(--mobalytics-back);
		border-radius: 8px;
    }

    @media (max-width: 1050px) {
        
        .profile-list {
            margin: 0px 16px 24px;
        }
    }

    @media (max-width: 800px) {
        
        .profile-wrapper {
            padding: 24px 16px 0px 16px;
        }
    }
</style>