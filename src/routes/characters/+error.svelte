<script lang="ts">
  import { page } from '$app/state';
  import '$lib/scripts/app.css';
  import { StatusCodes } from 'http-status-codes';
  // TODO: I don't like it. Should I just disable this rule for this?
</script>

{#if String(page.status) === String(StatusCodes.NOT_FOUND)}
  <h1>{page.status}: {page.error?.message}</h1>
  <p>We're sorry, but... it looks like you don't have any characters!</p>
{:else}
  <h1>{page.status}: {page.error?.message}</h1>
  <p>Sorry, something goes wrong</p>
{/if}

<p>Come back!</p>
