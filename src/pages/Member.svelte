<script>
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
    ModalHeader,
    ModalBody,
    Alert,
  } from "sveltestrap";
  import { createForm } from "svelte-forms-lib";
  import { v4 as uuidv4 } from "uuid";
  import * as yup from "yup";
  import ComTable from "../components/DynamicTable.svelte";
  import { supabase } from "../supabaseClient";
  import { onMount } from "svelte";

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      nama: "",
      alamat: "",
      tanggal_lahir: "",
      tanggal_bergabung: "",
      description: "",
    },
    onSubmit: (values) => {
      submitDataMember(values);
    },
  });
  $: dataListMember = [];

  onMount(() => {
    listMember();
  });

  let visibleAlertSuccess = false;

  async function listMember() {
    let { data, error } = await supabase.from("tbl_member").select("*");
    if (data) {
      dataListMember = data;
    }
  }

  async function submitDataMember(values) {
    const { data, error } = await supabase.from("tbl_member").insert({
      member_uuid: uuidv4(),
      nama: values.nama,
      alamat: values.alamat,
      tanggal_lahir: values.tanggal_lahir,
      tgl_bergabung: values.tanggal_bergabung,
      description: values.description,
    });

    if (data) {
      visibleAlertSuccess = true;
      listMember();
      openModalAddMember();
    }
  }

  const attribTable = [
    {
      header: "Nama",
      field: "nama",
    },
    {
      header: "Tgl. Lahir",
      field: "tanggal_lahir",
    },
    {
      header: "Alamat",
      field: "alamat",
    },
    {
      header: "Tgl. Bergabung",
      field: "tgl_bergabung",
    },
    {
      header: "Keterangan",
      field: "description",
    },
  ];

  let isOpenModalMember = false;

  function openModalAddMember() {
    isOpenModalMember = !isOpenModalMember;
  }
</script>

<Container>
  <Row>
    <Col>
      <Button color="primary" on:click={openModalAddMember}>Add Member</Button>
    </Col>
  </Row>
  <Alert
    color="success"
    isOpen={visibleAlertSuccess}
    toggle={() => (visibleAlertSuccess = false)}
  >
    Data saved successfully
  </Alert>
  <Row>
    <Col>
      {#await dataListMember}
        <p>loading...</p>
      {:then payload}
        <ComTable data={payload} attribute={attribTable} />
      {:catch error}
        <p style="color: red">{error.message}</p>
      {/await}
    </Col>
  </Row>

  <Modal isOpen={isOpenModalMember} toggle={openModalAddMember}>
    <form on:submit={handleSubmit}>
      <ModalHeader toggle={openModalAddMember}>Member</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="nama">Nama</Label>
          <Input
            name="nama"
            id="nama"
            placeholder="Masukkan Nama"
            on:change={handleChange}
            bind:value={$form.nama}
          />
          <!-- {#if $errors.nama && $touched.nama}
            <small>{$errors.nama}</small>
          {/if} -->
          <br />

          <Label for="alamat">Alamat</Label>
          <Input
            name="alamat"
            id="alamat"
            placeholder="Masukkan Alamat"
            on:change={handleChange}
            bind:value={$form.alamat}
            type="textarea"
          />
          <!-- {#if $errors.alamat && $touched.alamat}
            <small>{$errors.alamat}</small>
          {/if} -->
          <br />

          <Label for="tanggal_lahir">Tanggal Lahir</Label>
          <Input
            type="date"
            name="tanggal_lahir"
            id="tanggal_lahir"
            placeholder="Tanggal Lahir"
            on:change={handleChange}
            bind:value={$form.tanggal_lahir}
          />
          <!-- {#if $errors.tanggalLahir && $touched.tanggalLahir}
            <small>{$errors.tanggalLahir}</small>
          {/if} -->
          <br />

          <Label for="tanggal_bergabung">Tanggal Bergabung</Label>
          <Input
            type="date"
            name="tanggal_bergabung"
            id="tanggal_bergabung"
            placeholder="Tanggal Bergabung"
            on:change={handleChange}
            bind:value={$form.tanggal_bergabung}
          />
          <br />

          <Label for="keterangan">Keterangan</Label>
          <Input
            type="textarea"
            name="description"
            id="keterangan"
            placeholder="Keterangan"
            on:change={handleChange}
            bind:value={$form.description}
          />
          <br />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" type="submit">Do Something</Button>
        <!-- <Button color="secondary" on:click={openModalAddMember}>Cancel</Button> -->
      </ModalFooter>
    </form>
  </Modal>
</Container>

<style>
  /* small {
    color: red;
  } */
</style>
