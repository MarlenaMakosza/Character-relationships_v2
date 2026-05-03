<script lang="ts">
  import cytoscape from 'cytoscape';
  import { onMount } from 'svelte';

  onMount(() => {
    cytoscape({
      // eslint-disable-next-line unicorn/prefer-query-selector -- library prefer getElementById
      container: document.getElementById('graph'),
      elements: [
        { data: { id: 'a', label: 'Anna' } },
        { data: { id: 'b', label: 'Michael' } },
        { data: { id: 'c', label: 'Celina' } },
        { data: { source: 'a', target: 'b' } },
        { data: { source: 'b', target: 'c' } },
      ],
      style: [
        {
          selector: 'node',
          style: { label: 'data(label)', 'background-color': '#6366f1' },
        },
        {
          selector: 'edge',
          style: { 'line-color': '#94a3b8', width: 2 },
        },
      ],
      layout: { name: 'grid' },
    });
  });
</script>

<h1>Graf postaci</h1>
<div id="graph" style:width="600px" style:height="400px" style:border="1px solid #ccc"></div>
