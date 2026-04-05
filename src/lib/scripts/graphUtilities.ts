import type { Relationship } from '$lib/domain/Relationship';

import { RelationshipFormatter } from '$lib/formattters/RelationshipFormatter';
import { graphviz } from 'd3-graphviz';

export function renderGraph(relations: readonly Relationship[]): void {
  const diag = relations.map(relation => RelationshipFormatter.toString(relation)).join(' ');

  graphviz('#graph').renderDot(`digraph { ${diag} }`);
}
