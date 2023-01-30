import { createRouter, createWebHistory } from 'vue-router'

import Analytics from '../views/Analytics.vue'
import Content from '../views/Content.vue'
import CourseDetails from '../views/CourseDetails.vue'
import CourseListAdm from '../views/CourseListAdm.vue'
import Courses from '../views/Courses.vue'
import Login from '../views/Login.vue'
import MyCourses from '../views/MyCourses.vue'
import MyDiplomas from '../views/MyDiplomas.vue'
import { default as Profile, default as Profile } from '../views/Profile.vue'
import Settings from '../views/Settings.vue'
import UserListAdm from '../views/UserListAdm.vue'
import VideoPlayer from '../views/VideoPlayer.vue'
import Workshop from '../views/Workshop.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Landing,
            name: "Landing"
        },
        {
            path: '/home',
            component: Home,
            name: "Home"
        },
        {
            path: '/courses/:id',
            component: CourseDetails,
            name: "Curso"
        },
        {
            path: '/courselist',
            component: CourseListAdm,
            name: "Lista de Cursos"
        },
        {
            path: '/courses',
            component: Courses,
            name: "Cursos"
        },
        {
            path: '/users/:id/content',
            component: Content,
            name: "Conteúdo"
        },
        {
            path: '/users/:id/workshop',
            component: Workshop,
            name: "Workshop"
        },
        {
            path: '/users/:id/analytics',
            component: Analytics,
            name: "Estatísticas"
        },
        {
            path: '/login',
            component: Login,
            name: "Login"
        },
        {
            path: '/users/:id',
            component: Profile,
            name: "Perfil do Utilizador"
        },
        {
            path: '/users/:id/courses',
            component: MyCourses,
            name: "Meus Cursos"
        },
        {
            path: '/users/:id/diplomas',
            component: MyDiplomas,
            name: "Meus Diplomas"
        },
        {
            path: '/settings',
            component: Settings,
            name: "Preferências"
        },
        {
            path: '/courses/:id/videos',
            component: VideoPlayer,
            name: "Vídeo"
        },
        {
            path: '/users',
            component: UserListAdm,
            name: "Lista de Utilizadores"
        }
    ]
})

export default router