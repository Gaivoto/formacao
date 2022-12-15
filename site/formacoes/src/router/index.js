import { createRouter, createWebHistory } from 'vue-router'

import Landing from '../views/Landing.vue'
import Home from '../views/Home.vue'
import CourseDetails from '../views/CourseDetails.vue'
import CourseListAdm from '../views/CourseListAdm.vue'
import Courses from '../views/Courses.vue'
import Workshop from '../views/Workshop.vue'
import Analytics from '../views/Analytics.vue'
import Content from '../views/Content.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import MyCourses from '../views/MyCourses.vue'
import MyDiplomas from '../views/MyDiplomas.vue'
import VideoPlayer from '../views/VideoPlayer.vue'
import Settings from '../views/Settings.vue'
import UserListAdm from '../views/UserListAdm.vue'

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
            component: CourseDetails,
            name: "courseDetails"
        },
        {
            path: '/courselist',
            component: CourseListAdm
        },
        {
            path: '/courses',
            component: Courses,
            name: "Courses"
        },
        {
            path: '/users/:id/content',
            component: Content,
            name: "content"
        },
        {
            path: '/users/:id/workshop',
            component: Workshop,
            name: "workshop"
        },
        {
            path: '/users/:id/analytics',
            component: Analytics,
            name: "analytics"
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
            component: Profile,
            name: "profile"
        },
        {
            path: '/users/:id/courses',
            component: MyCourses,
            name: "mycourses"
        },
        {
            path: '/users/:id/diplomas',
            component: MyDiplomas,
            name: "mydiplomas"
        },
        {
            path: '/settings',
            component: Settings
        },
        {
            path: '/courses/:id/videos',
            component: VideoPlayer,
            name: "videoPlayer"
        },
        {
            path: '/users',
            component: UserListAdm
        }
    ]
})

export default router