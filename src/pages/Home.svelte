<script>
  import { onMount } from "svelte";

  import {
    Col,
    Container,
    Row,
    Button,
    Modal,
    FormGroup,
    Label,
    Input,
    ModalFooter,
  } from "sveltestrap";
  import ComTable from "../components/Table.svelte";
  import { supabase } from "../supabaseClient";

  onMount(() => {
    getListKlasemen();
  });

  $: dataListKlasemen = [];

  async function getListKlasemen() {
    let { data, error } = await supabase
      .from("tbl_klasemen")
      .select(`*, member:member_id(nama, id, member_uuid)`)
      .order("point", { ascending: false });
    dataListKlasemen = data;
  }

  async function listMember() {
    let { data, error } = await supabase.from("tbl_member").select("*");

    return data;
  }

  const dataListMember = listMember();

  const attribTable = [
    {
      header: "Name",
      field: "name",
    },
    {
      header: "Play",
      field: "play",
    },
    {
      header: "Total Score",
      field: "total_score",
    },
    {
      header: "Total Co Score",
      field: "total_co_score",
    },
    {
      header: "Point",
      field: "point",
    },
  ];
</script>

<Container>
  <Row>
    <Col>
      {#await dataListKlasemen}
        <p>loading...</p>
      {:then payloadTable}
        <ComTable data={payloadTable} attribute={attribTable} />
      {:catch error}
        <p style="color: red">{error.message}</p>
      {/await}
    </Col>
  </Row>
</Container>
