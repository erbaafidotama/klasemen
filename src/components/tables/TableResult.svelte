<script>

  import { Table } from "sveltestrap";
  export let data;
</script>

<Table striped hover responsive bordered style="text-align: center;">
  <thead>
    <tr>
      <th colspan="5">Team A</th>
      <th colspan="5">Team B</th>
      <th>Tanggal Match</th>
    </tr>

    <tr>
      <th>Player 1</th>
      <th>Player 2</th>
      <th>Set 1</th>
      <th>Set 2</th>
      <th>Set 3</th>

      <th>Player 1</th>
      <th>Player 2</th>
      <th>Set 1</th>
      <th>Set 2</th>
      <th>Set 3</th>

      <th />
    </tr>
  </thead>
  <tbody>
    {#each data as data}
      <!-- {@debug data} -->
      <tr>
        <td>{data.team_a_player_1.nama}</td>
        <td>{data.team_a_player_2.nama}</td>
        <td>{data.team_a_set_1}</td>
        <td>{data.team_a_set_2}</td>
        <td>{data.team_a_set_3 === null ? "" : data.team_a_set_3}</td>
        <td>{data.team_b_player_1.nama}</td>
        <td>{data.team_b_player_2.nama}</td>
        <td>{data.team_b_set_1}</td>
        <td>{data.team_b_set_2}</td>
        <td>{data.team_b_set_3 === null ? "" : data.team_b_set_3}</td>
        <td>{data.tanggal_match}</td>
      </tr>
    {/each}
  </tbody>
</Table>
