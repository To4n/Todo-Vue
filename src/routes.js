import App from './App.vue'
import LandingPage from  './components/pages/LandingPage'
import About from  './components/pages/About'
import Login from  './components/auth/Login'
import Register from './components/auth/Register'
const routes = [
    {
        path: '/', 
        component: LandingPage,
        name: 'home'
    },
    {
        path: '/todo',
        component: App,
        name: 'app'
    },
    {
        path: '/about',
        component: About,
        name: 'about'
    },
    {
        path: '/login',
        component: Login,
        name: 'login'
    },
    {
        path: '/register',
        component: Register,
        name: 'register'
    },
    
  ]

export default routes