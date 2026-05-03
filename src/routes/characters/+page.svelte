<script lang="ts">
  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();
  // TODO: IDE mark data.characters as error
</script>

<h1>Characters</h1>
<ul>

  {#each data.characters as character (character.id)}
    <li>{character.name}</li>
  {/each}
</ul>
