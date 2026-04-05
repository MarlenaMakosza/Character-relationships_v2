<script lang="ts">
  import '$lib/scripts/app.css';
  import type { IRelation } from '$lib/interfaces/interfaces';

  export let data: { relations: IRelation[] };
  const { relations } = data;
</script>

<h1>Relationship List</h1>

<div>
  <table>
    <thead>
      <tr>
        <th>Relationship ID</th>
        <th>ID First Character</th>
        <th>ID Second Character</th>
        <th>About Relation</th>
      </tr>
    </thead>
    <tbody>
      {#each relations as relation (relation.id)}
        <tr>
          <td>{relation.id}</td>
          <td>{relation.idChar1}</td>
          <td>{relation.idChar2}</td>
          <td>{relation.about}</td>
          <!-- {#each Object.values(relation) as cell} -->
          <!--	<td>{cell}</td> -->
          <!-- {/each} -->
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<br />
