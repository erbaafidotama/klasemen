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
  import Table from "../components/tables/TableKlasemen.svelte";
  import { supabase } from "../supabaseClient";
  import { getListKlasemen } from "../api/api";

  $: dataListKlasemen = [];

  onMount(() => {
    dataListKlasemen = getListKlasemen();
  });

  // async function getListKlasemen() {
  //   let { data, error } = await supabase
  //     .from("tbl_klasemen")
  //     .select(`*, member:member_id(nama, id, member_uuid)`)
  //     .order("point", { ascending: false })
  //     .order("diff_score", { ascending: false });
  //   dataListKlasemen = data;
  // }

  async function listMember() {
    let { data, error } = await supabase.from("tbl_member").select("*");

    return data;
  }

  const dataListMember = listMember();

  const attribTable = [
    {
      header: "",
      field: "rank_klasemen",
    },
    {
      header: "Name",
      field: "name",
    },
    {
      header: "Play",
      field: "play",
    },
    {
      header: "W",
      field: "win",
    },
    {
      header: "D",
      field: "draw",
    },
    {
      header: "L",
      field: "lose",
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
      header: "Diff. Score",
      field: "diff_score",
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
        <Table data={payloadTable} attribute={attribTable} />
      {:catch error}
        <p style="color: red">{error.message}</p>
      {/await}
    </Col>
  </Row>
</Container>
