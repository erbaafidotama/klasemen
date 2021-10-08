<script>
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from "sveltestrap";
  import icon from "../images/icon-pblenong.png";

  let isOpen = false;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

<Navbar color="light" light expand="md">
  <NavbarBrand href="/"><img src={icon} alt="background image" style="width: 2em; height: 2em" /> Klasemen PB. Lenong</NavbarBrand>
  <!-- <NavbarToggler on:click={() => (isOpen = !isOpen)} /> -->
  <!-- <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ms-auto" navbar>
      <NavItem>
        <NavLink href="/" on:click={handleUpdate}>Home</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/member" on:click={handleUpdate}>Member</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/result" on:click={handleUpdate}>Result Match</NavLink>
      </NavItem>
    </Nav>
  </Collapse> -->
</Navbar>
