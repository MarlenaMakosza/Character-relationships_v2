import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'docs',

  title: 'Charel',
  description: 'Charel documentation',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Architecture', link: '/architecture/arc42/01-introduction-goals' },
      { text: 'Decisions', link: '/architecture/decisions/001-cytoscape-for-graph-visualization' },
    ],

    sidebar: [
      {
        text: 'arc42',
        items: [
          { text: '01 Introduction & Goals', link: '/architecture/arc42/01-introduction-goals' },
          { text: '02 Constraints', link: '/architecture/arc42/02-constraints' },
          { text: '03 Context & Scope', link: '/architecture/arc42/03-context-scope' },
          { text: '04 Solution Strategy', link: '/architecture/arc42/04-solution-strategy' },
          { text: '05 Building Block View', link: '/architecture/arc42/05-building-block-view' },
          { text: '11 Risks & Tech Debt', link: '/architecture/arc42/11-risks-technical-debt' },
          { text: '12 Glossary', link: '/architecture/arc42/12-glossary' },
          { text: 'Backlog', link: '/architecture/arc42/backlog' },
        ],
      },
      {
        text: 'Appendix',
        collapsed: true,
        items: [
          { text: 'Character Attributes', link: '/architecture/arc42/appendix/character-attributes' },
          { text: 'Character Attributes Extended', link: '/architecture/arc42/appendix/character-attributes-extended' },
          { text: 'Event Types', link: '/architecture/arc42/appendix/event-types' },
          { text: 'Relationship Types', link: '/architecture/arc42/appendix/relationship-types' },
          { text: 'Validation Strategy', link: '/architecture/arc42/appendix/validation-strategy' },
        ],
      },
      {
        text: 'Decisions (ADR)',
        items: [
          { text: 'ADR-001 Cytoscape', link: '/architecture/decisions/001-cytoscape-for-graph-visualization' },
          { text: 'ADR-002 Binary Edges', link: '/architecture/decisions/002-binary-edges-as-relation-unit' },
          { text: 'ADR-003 Relation Schema Rules', link: '/architecture/decisions/003-relation-schema-rules' },
          { text: 'ADR-004 Archgate', link: '/architecture/decisions/004-archgate-for-adr-enforcement' },
          { text: 'ADR-005 arc42 Structure', link: '/architecture/decisions/005-arc42-documentation-structure' },
          { text: 'ADR-006 Drizzle Migrations', link: '/architecture/decisions/006-programmatic-drizzle-migrations' },
          { text: 'ADR-007 VitePress', link: '/architecture/decisions/007-vitepress-for-architecture-docs' },
          { text: 'ADR-008 GitHub Actions CI', link: '/architecture/decisions/008-github-actions-for-docs-ci' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/MarlenaMakosza/character-relationships-v2' },
    ],
  },
})
