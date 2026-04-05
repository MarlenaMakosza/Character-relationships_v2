<script lang="ts">
	import '$lib/scripts/app.css';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	let firstName = '';
	let lastName = '';
	let age = '';
	let errorMessage = '';

	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	const handleSubmit = async (event: Event): Promise<void> => {
	  event.preventDefault();

	  if (!firstName || !lastName) {
	    errorMessage = 'Both fields are required.';

	    return;
	  }

	  const formData = new FormData();
	  formData.append('firstName', firstName);
	  formData.append('lastName', lastName);
	  formData.append('age', age);
	  const response = await fetch('/add_character', {
	    method: 'POST',
	    body: formData,
	  });

	  if (response.ok) {
	    await goto(`${base}/characters`, { replaceState: true });
	  } else {
	    console.error('Error adding character. Please try again.');
	  }
	};
</script>

<h1>Add New Character</h1>
<form on:submit={handleSubmit}>
	<label for="firstName">First Name:</label>
	<input id="firstName" name="firstName" type="text" bind:value={firstName} />

	<label for="lastName">Last Name:</label>
	<input id="lastName" name="lastName" type="text" bind:value={lastName} />

	<label for="age">Age:</label>
	<input id="age" name="age" type="number" bind:value={age} />

	<button type="submit">Add Character</button>
</form>

{#if errorMessage}
	<p style:color="red" style:text-align="center">{errorMessage}</p>
{/if}
