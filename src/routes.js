import LandingPage from "./pages/LandingPage.svelte";
import Home from "./pages/Home.svelte";
import Member from "./pages/Member.svelte";
import Result from "./pages/Result.svelte";

const routes = [
  {
    name: "/",
    component: LandingPage,
  },
  {
    name: "klasemen",
    component: Home,
  },
  { name: "member", component: Member },
  { name: "result", component: Result },
];

export { routes };
