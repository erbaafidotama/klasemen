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
  import Table from "../components/tables/TableMember.svelte";
  import { supabase } from "../supabaseClient";
  import { onMount } from "svelte";

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      nama: "",
      alamat: "",
      tanggal_lahir: "",
      tgl_bergabung: "",
      description: "",
    },
    onSubmit: (values) => {
      submitDataMember(values);
    },
  });
  let clearValues = {
    nama: "",
    alamat: "",
    tanggal_lahir: "",
    tgl_bergabung: "",
    description: "",
  };
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
    if (values.member_uuid) {
      const { data, error } = await supabase
        .from("tbl_member")
        .update({
          nama: values.nama,
          alamat: values.alamat,
          tanggal_lahir: values.tanggal_lahir,
          tgl_bergabung: values.tgl_bergabung,
          description: values.description,
        })
        .eq("member_uuid", values.member_uuid);
      if (data) {
        visibleAlertSuccess = true;
        listMember();
        openModalAddMember();
        $form = clearValues;
      }
    } else {
      const { data, error } = await supabase.from("tbl_member").insert({
        member_uuid: uuidv4(),
        nama: values.nama,
        alamat: values.alamat,
        tanggal_lahir: values.tanggal_lahir,
        tgl_bergabung: values.tgl_bergabung,
        description: values.description,
      });
      if (data) {
        visibleAlertSuccess = true;
        listMember();
        openModalAddMember();
        $form = clearValues;
      }
    }
    console.log(values);
  }

  const headerTable = [
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

  const buttonList = [
    {
      name: "Edit",
      color: "warning",
      size: "sm",
      onClick: (data) => openModalEditMember(data),
    },
    {
      name: "Delete",
      color: "danger",
      size: "sm",
      onClick: (data) => openModalDeleteMember(data),
    },
  ];

  let isOpenModalMember = false;
  let isOpenModalDeleteMember = false;

  function openModalAddMember() {
    isOpenModalMember = !isOpenModalMember;
  }

  async function openModalDeleteMember(data) {
    isOpenModalDeleteMember = !isOpenModalDeleteMember;
    $form = await getOneMember(data);
  }

  async function openModalEditMember(data) {
    isOpenModalMember = !isOpenModalMember;
    $form = await getOneMember(data);
    console.log($form);
  }

  async function getOneMember(param) {
    console.log(param);
    let { data, error } = await supabase
      .from("tbl_member")
      .select("*")
      .eq("member_uuid", param.member_uuid);
    console.log(data);
    return data[0];
  }

  async function doDeleteMember() {
    let { data, error } = await supabase
      .from("tbl_member")
      .delete()
      .eq("member_uuid", $form.member_uuid);

    console.log("DELETE", data);
    if (data) {
      listMember();
      $form = clearValues;
      isOpenModalDeleteMember = !isOpenModalDeleteMember;
    }
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
        <Table datas={payload} headers={headerTable} {buttonList} />
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

          <Label for="tgl_bergabung">Tanggal Bergabung</Label>
          <Input
            type="date"
            name="tgl_bergabung"
            id="tgl_bergabung"
            placeholder="Tanggal Bergabung"
            on:change={handleChange}
            bind:value={$form.tgl_bergabung}
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
        <Button color="primary" type="submit">Save</Button>
        <!-- <Button color="secondary" on:click={openModalAddMember}>Cancel</Button> -->
      </ModalFooter>
    </form>
  </Modal>

  <Modal isOpen={isOpenModalDeleteMember} toggle={openModalDeleteMember}>
    <ModalHeader toggle={openModalDeleteMember}>Delete Member</ModalHeader>
    <ModalBody>
      Yakin ingin delete data member <b>{$form.nama}</b>?
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={doDeleteMember}>Save</Button>
      <Button color="secondary" on:click={openModalDeleteMember}>Cancel</Button>
    </ModalFooter>
  </Modal>
</Container>

<style>
  /* small {
    color: red;
  } */
</style>
