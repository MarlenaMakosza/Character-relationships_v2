<script lang="ts">
  import { page } from '$app/state';
  import '$lib/scripts/app.css';
  import { StatusCodes } from 'http-status-codes';
</script>

{#if String(page.status) === String(StatusCodes.NOT_FOUND)}
  <h1>{page.status}: {page.error?.message}</h1>
  <p>We're sorry, but we couldn't find the character you were looking for.</p>
{/if}
{#if String(page.status) === String(StatusCodes.BAD_REQUEST)}
  <h1>{page.status}: {page.error?.message}</h1>
  <p>You, can't to do this.</p>
{/if}

<p>Come back!</p>
