/// <reference path="../rules.d.ts" />

export default {
  rules: {
    'no-repository-in-routes': {
      description: 'Routes must not import repositories directly — use a controller',
      async check(ctx) {
        for (const file of ctx.scopedFiles) {
          const matches = await ctx.grep(file, /from ['"](\$lib\/repositories|\.\.\/.*repositories)/);
          for (const match of matches) {
            ctx.report.violation({
              message: 'Direct repository import in route — use a controller instead',
              file: match.file,
              line: match.line,
              fix: 'Move the logic to a controller in $lib/Controller and import that instead',
            });
          }
        }
      },
    },
    'no-service-in-routes': {
      description: 'Routes must not import services directly — use a controller',
      async check(ctx) {
        for (const file of ctx.scopedFiles) {
          const matches = await ctx.grep(file, /from ['"](\$lib\/services|\.\.\/.*services)/);
          for (const match of matches) {
            ctx.report.violation({
              message: 'Direct service import in route — use a controller instead',
              file: match.file,
              line: match.line,
              fix: 'Move the logic to a controller in $lib/Controller and import that instead',
            });
          }
        }
      },
    },
  },
} satisfies RuleSet;
