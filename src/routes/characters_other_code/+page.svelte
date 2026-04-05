<script lang="ts">
	import '$lib/scripts/app.css';
	// export let data: { characters: ICharacter[] };
	// const characters = data.characters;

	import type { PageData } from './$types';

	// Svelte 5
	// let { data }: { data: PageData } = $props();
	const { data }: { data: PageData } = $props();
	const { characters } = data;

	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	// DEBUG
	console.log('Received characters in Svelte:', characters);

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
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each characters as character (character.id)}
				<tr>
					<td>{character.id}</td>
					<td>{character.firstName}</td>
					<td>{character.lastName}</td>
					<td>
						<button
							onclick={async () => {
							  await deleteCharacter(character.id);
							}}
							type="button">
							Delete</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
