<script lang="ts">
  import '$lib/scripts/app.css';
  import type { ICharacter } from '$lib/interfaces/interfaces';

  export let data: { result: ICharacter[] };
  let AllCharacters = data.result;
</script>

<h1>Character List</h1>
{#if AllCharacters && AllCharacters.length > 0}
  <div>
    <table>
      <thead>
        <tr>
          {#each Object.keys(AllCharacters[0]) as columnName (columnName)}
            <th>{columnName}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each AllCharacters as character (character.id)}
          <tr>
            {#each Object.values(character) as cell (cell)}
              <td>{cell}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <p>No characters found.</p>
{/if}
