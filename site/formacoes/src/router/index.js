import { createRouter, createWebHistory } from 'vue-router'

import About from '../views/About.vue'
import Home from '../views/Home.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Landing
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/courses/:id',
            component: CourseDetails
        },
        {
            path: '/courselist',
            component: CourseListAdm
        },
        {
            path: '/courses',
            component: Course
        },
        {
            path: '/creators/:id',
            component: Creator
        },
        {
            path: '/studio',
            component: CreatorStudio
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/users/:id',
            component: Profile
        },
        {
            path: '/users/:id/courses',
            component: MyCourses
        },
        {
            path: '/users/:id/diplomas',
            component: MyDiplomas
        },
        {
            path: '/settings',
            component: Settings
        },
        {
            path: '/courses/:id/videos/:id',
            component: VideoPlayer
        },
        {
            path: '/users',
            component: UserListAdm
        }
    ]
})

export default router