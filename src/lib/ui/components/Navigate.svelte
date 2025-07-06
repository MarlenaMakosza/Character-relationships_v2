<script lang="ts">
	import { navigateBetweenPages } from '$lib/scripts/navigate';
</script>

<button name="characters" type="button" on:click={navigateBetweenPages}>Characters</button>
<button name="relations" type="button" on:click={navigateBetweenPages}>Relationships</button>
<button name="character_rel" type="button" on:click={navigateBetweenPages}
	>Characters relationships</button>
<button name="add_character" type="button" on:click={navigateBetweenPages}>Add character</button>
<button name="sandbox" type="button" on:click={navigateBetweenPages}>Test</button>
<button name="/" type="button" on:click={navigateBetweenPages}>Main menu</button>
