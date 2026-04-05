<script lang="ts">
  import '$lib/scripts/app.css';
  export let data: null | string; // The full name of the initiator character
</script>

<h1>Initiator Full Name</h1>
<div>
  {#if data}
    <p>The initiator's full name is: {data}</p>
  {:else}
    <p>Initiator not found.</p>
  {/if}
</div>
