<script lang="ts">
  import { page } from '$app/state';
  import '$lib/scripts/app.css';
  import { StatusCodes } from 'http-status-codes';
  // TODO: I don't like it
  const pageStatus = String(page.status);
  const notFoundStatus = String(StatusCodes.NOT_FOUND);
</script>

{#if pageStatus === notFoundStatus}
  <h1>{page.status}: {page.error?.message}</h1>
  <p>Sorry, but you haven't relations :(</p>
{/if}

<p>Come back!</p>
