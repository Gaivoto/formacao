import Tr from '@/i18n/translation.js'
import { createRouter, createWebHistory, RouterView } from 'vue-router'

import Analytics from '../views/Analytics.vue'
import Content from '../views/Content.vue'
import CourseDetails from '../views/CourseDetails.vue'
import CourseListAdm from '../views/CourseListAdm.vue'
import Courses from '../views/Courses.vue'
import Home from '../views/Home.vue'
import Landing from '../views/Landing.vue'
import Login from '../views/Login.vue'
import MyCourses from '../views/MyCourses.vue'
import MyDiplomas from '../views/MyDiplomas.vue'
import NotFound from '../views/NotFound.vue'
import Profile from '../views/Profile.vue'
import Settings from '../views/Settings.vue'
import UserListAdm from '../views/UserListAdm.vue'
import VideoPlayer from '../views/VideoPlayer.vue'
import Workshop from '../views/Workshop.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/:locale?',
            component: RouterView,
            beforeEnter: Tr.routeMiddleware,
            children: [
                {
                    path: '',
                    component: Landing,
                    name: "Landing"
                },
                {
                    path:':pathMatch(.*)*',
                    component: NotFound,
                    name: "NotFound"
                },
                {
                    path: 'home',
                    component: Home,
                    name: "Home"
                },
                {
                    path: 'courses/:id',
                    component: CourseDetails,
                    name: "Curso"
                },
                {
                    path: 'courselist',
                    component: CourseListAdm,
                    name: "Lista de Cursos"
                },
                {
                    path: 'courses',
                    component: Courses,
                    name: "Cursos"
                },
                {
                    path: 'users/:id/content',
                    component: Content,
                    name: "Conteúdo"
                },
                {
                    path: 'users/:id/workshop/:idCourse',
                    component: Workshop,
                    name: "Workshop"
                },
                {
                    path: 'users/:id/analytics',
                    component: Analytics,
                    name: "Estatísticas"
                },
                {
                    path: 'login',
                    component: Login,
                    name: "Login"
                },
                {
                    path: 'users/:id',
                    component: Profile,
                    name: "Perfil do Utilizador"
                },
                {
                    path: 'users/:id/courses',
                    component: MyCourses,
                    name: "Meus Cursos"
                },
                {
                    path: 'users/:id/diplomas',
                    component: MyDiplomas,
                    name: "Meus Diplomas"
                },
                {
                    path: 'settings',
                    component: Settings,
                    name: "Preferências"
                },
                {
                    path: 'courses/:id/videos/:idVid',
                    component: VideoPlayer,
                    name: "Vídeo"
                },
                {
                    path: 'users',
                    component: UserListAdm,
                    name: "Lista de Users"
                }
            ]
        }
    ]
})

export default router