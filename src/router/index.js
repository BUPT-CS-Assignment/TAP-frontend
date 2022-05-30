import Vue from 'vue'
import VueRouter from 'vue-router'

/* Auth */
import Auth from '../views/Auth/AuthView.vue'
//import Signin from '../views/Auth/Signin.vue'
//import Signup from '../views/Auth/Signup.vue'

/* Home */
import HomeMain from '../views/Home/Main.vue'
import HomeDetail from '../views/Home/Detail.vue'

/* Schedule */
import ScheMain from '../views/Schedule/Main.vue'
import ScheTable from '../views/Schedule/Timetable.vue'

/* Course */
import CourseMain from '../views/Courses/Main.vue'

/* Map */
import MapMain from '../views/Map/Main.vue'
import MapOverView from '../views/Map/Overview.vue'



Vue.use(VueRouter)

const routes = [
    {path:'/auth',component:Auth},

    {path:'/home/overview',component:HomeMain},
    {path:'/home',redirect:'/home/overview'},
    {path:'/home/detail',component:HomeDetail},

    {path:'/schedule',redirect:'/schedule/overview'},
    {path:'/schedule/overview',component:ScheMain},
    {path:'/schedule/timetable',component:ScheTable},

    {path:'/courses',redirect:'/courses/index'},
    {path:'/courses/index',component:CourseMain},

    {path:'/map',redirect:'/map/navigation'},
    {path:'/map/navigation',component:MapMain},
    {path:'/map/overview',component:MapOverView},
    
    {
        path:'*',
        redirect:'/home/overview',
    },
]

const router = new VueRouter({
  routes
})

export default router
