/// <reference path="../rules.d.ts" />

export default {
  rules: {
    'no-console-error': {
      description: 'Use logError() instead of console.error()',
      async check(ctx) {
        for (const file of ctx.scopedFiles) {
          const matches = await ctx.grep(file, /console\.error\(/);
          for (const match of matches) {
            ctx.report.violation({
              message: 'Use logError() instead of console.error()',
              file: match.file,
              line: match.line,
              fix: 'Import logError from your helpers and use it instead',
            });
          }
        }
      },
    },
  },
} satisfies RuleSet;
