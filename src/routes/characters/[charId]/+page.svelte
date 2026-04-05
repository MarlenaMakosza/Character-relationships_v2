<script lang="ts">
  import type { ICharacter } from '$lib/interfaces/interfaces';

  import '$lib/scripts/app.css';
  import { page } from '$app/state';

  const characterId = Number.parseInt(page.params.charId);
  export let data: { character: ICharacter[] };
  const character = data.character[0];
</script>

<h1>Test character: {characterId}</h1>
<h2>Character: {character.firstName} {character.lastName}</h2>
<p>Age: {character.age}</p>
