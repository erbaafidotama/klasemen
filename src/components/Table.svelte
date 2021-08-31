<script>
  import { Table } from "sveltestrap";
  export let data;
</script>

<Table striped hover responsive bordered  style="text-align: center;">
  <!-- {@debug data} -->
  <thead>
    <tr>
      <!-- <th></th> -->
      <th>Nama</th>
      <th>Play</th>
      <th>Total Score</th>
      <th>Total Co.Score</th>
      <th>Diff. Score</th>
      <th>Point</th>
    </tr>
  </thead>
  <tbody>
      {#each data as data}
      <!-- {@debug data} -->
    <tr>
      <!-- <td>{index++}</td> -->
      <td>{data.member.nama}</td>
      <td>{data.play}</td>
      <td>{data.total_score}</td>
      <td>{data.total_co_score}</td>
      <td>{parseInt(data.total_score) - parseInt(data.total_co_score)}</td>
      <td>{data.point}</td>
    </tr>
    {/each}
  </tbody>
</Table>
