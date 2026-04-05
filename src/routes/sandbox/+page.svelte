<script lang="ts">
  import '$lib/scripts/app.css';
  import type { Character } from '$lib/domain/Character';

  export let data: { characters: Character[] };
  let characters = data.characters;
</script>

<h1>Character List</h1>
<div>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Full Name</th>
      </tr>
    </thead>
    <tbody>
      {#each characters as character (character.id)}
        <tr>
          <td>{character.id}</td>
          <td>{character.firstName}</td>
          <td>{character.lastName}</td>
          <td>{character.fullName}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
