<!-- <script lang="ts">
  import '$lib/scripts/app.css';

  import type { ICharacter } from '$lib/interfaces/interfaces';

  import { goto } from '$app/navigation';
  import { base } from '$app/paths';

  // In Svelte 4:
  export let data: { characters: ICharacter[] };
  const { characters } = data;

  export async function deleteCharacter(id: number): Promise<void> {
    if (confirm('Are you sure you want to delete this character?')) {
      const response = await fetch('/characters', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        await goto(`${base}/characters`, { replaceState: true });
        globalThis.location.reload();
      } else {
        interface ErrorResponse {
          message: string;
        }

        // TODO: Add better error handling

        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        const errorData = (await response.json()) as ErrorResponse;
        alert(`Failed to delete character: ${errorData.message}`);
      }
    }
  }
</script>

<h1>Character List</h1>
<div>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each characters as character (character.id)}
        <tr>
          <td>{character.id}</td>
          <td>{character.firstName}</td>
          <td>{character.lastName}</td>
          <td>{character.age}</td>
          <td>
            <button
              type="button"
              on:click={async () => {
                await deleteCharacter(character.id);
              }}>
              Delete</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div> -->
