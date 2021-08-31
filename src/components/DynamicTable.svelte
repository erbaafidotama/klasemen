<script>
    import { Table, Column } from "sveltestrap";
    export let data;
    export let attribute
  </script>
  
  
  <Table rows={data} let:row striped hover responsive>
    {#each attribute as attribute}
      <Column header={attribute.header}>
        {row[attribute.field]}
      </Column>
    {/each}
  </Table>