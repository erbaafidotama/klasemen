<script>
  import { Router } from "svelte-router-spa";
  import { routes } from "./routes";
  import Navbar from "./components/Navbar.svelte";
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
  />
</svelte:head>

<Navbar />
<br />
<Router {routes} />

<style>
</style>
