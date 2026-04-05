<script lang="ts">
  import '$lib/scripts/app.css';

  import type { ICharacter, IRelation } from '$lib/interfaces/interfaces';

  import { renderGraph } from '$lib/scripts/graphUtilities';
  import { onMount } from 'svelte';

  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();
  const { characters } = data;
  const { relations } = data;

  // Helper functions
  function getRelationsForCharacter(characterId: number): IRelation[] {
    return relations.filter((rel: Readonly<IRelation>) => rel.idChar1 === characterId);
  }

  function getRelatedCharacter(relatedCharacterId: number): ICharacter[] {
    return characters.filter((char: Readonly<ICharacter>) => char.id === relatedCharacterId);
  }

  onMount(() => {
    renderGraph(relations);
  });
</script>

<main>
  <div id="left">
    <h1>Relations between character</h1>
    <div>
      <table>
        <thead>
          <tr>
            <th>Character Name</th>
            <th>Related Character</th>
            <th>About Relationship</th>
          </tr>
        </thead>
        <tbody>
          {#each characters as character (character.id)}
            {#each getRelationsForCharacter(character.id) as relation (relation.id)}
              <tr>
                <td>
                  {#if character.firstName}{character.firstName}{:else}Unknown{/if}
                  {#if character.lastName}{character.lastName}{:else}Unknown{/if}
                </td>
                <td>
                  {#each getRelatedCharacter(relation.idChar2) as relatedCharacter (relatedCharacter.id)}
                    {#if relatedCharacter.firstName}{relatedCharacter.firstName}{:else}Unknown{/if}
                    {#if relatedCharacter.lastName}{relatedCharacter.lastName}{:else}Unknown{/if}
                  {/each}
                </td>
                <td>{relation.about}</td>
              </tr>
            {/each}
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  <div id="svg">
    <svg id="graph" height="1000px" width="1050px" />
  </div>
</main>

<style lang="css">
  #svg {
    display: block;
    margin-left: auto;
    width: fit-content;
  }
</style>
