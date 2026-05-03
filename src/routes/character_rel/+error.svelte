<script lang="ts">
  import { page } from '$app/state';
  import '$lib/scripts/app.css';
  const pageStatus = String(page.status);
  const NOT_FOUND = 404;
  const notFoundStatus = String(NOT_FOUND);
</script>

{#if pageStatus === notFoundStatus}
  <h1>{page.status}: {page.error?.message}</h1>
  <p>Sorry, but you haven't relations :(</p>
{/if}

<p>Come back!</p>
