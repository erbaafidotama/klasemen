<script>
  import { Table, Column, Button } from "sveltestrap";
  export let datas;
  export let buttonList;
  export let headers;
</script>

<!-- <Table rows={data} let:row striped hover responsive>
    {#each attribute as attribute}
      <Column header={attribute.header}>
        {row[attribute.field]}
      </Column>
    {/each}
  </Table> -->

<Table striped hover responsive style="text-align: center;">
  <thead>
    <tr>
      {#each headers as header}
        <th>{header.header}</th>
      {/each}
      <!-- <th>Nama</th>
        <th>Play</th>
        <th>Total Score</th>
        <th>Total Co.Score</th>
        <th>Diff. Score</th>
        <th>Point</th> -->
      <th />
    </tr>
  </thead>
  <tbody>
    {#each datas as data}
      <tr>
        <td>{data.nama ? data.nama : ""}</td>
        <td>{data.tanggal_lahir ? data.tanggal_lahir : ""}</td>
        <td>{data.alamat ? data.alamat : ""}</td>
        <td>{data.tgl_bergabung ? data.tgl_bergabung : ""}</td>
        <td>{data.description ? data.description : ""}</td>
        <td>
          {#each buttonList as button}
            <Button
              style="margin-right: 2px; margin-left: 2px"
              color={button.color}
              size={button.size}
              on:click={button.onClick(data)}>{button.name}</Button
            >
          {/each}
        </td>
      </tr>
    {/each}
  </tbody>
</Table>
