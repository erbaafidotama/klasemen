import Home from "./pages/Home.svelte"
import Member from "./pages/Member.svelte"
import Result from "./pages/Result.svelte"

const routes = [
    {
      name: '/',
      component: Home,
    },
    { name: 'member', component: Member, },
    { name: 'result', component: Result, },
  ]
  
  export { routes }