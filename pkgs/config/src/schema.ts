import { type Static, Type } from '@sinclair/typebox';

export type LansaConfig = Static<typeof LansaConfig>;
export const LansaConfig = Type.Object(
  {
    workspace: Type.Object(
      {
        providers: Type.Array(
          Type.String({
            examples: ['@lansa/provider-pnpm']
          }),
          {
            description:
              'A list of workspace providers to use. Workspace providers are used to get the packages in the workspace.'
          }
        ),
        publishable: Type.Optional(
          Type.Object(
            {
              paths: Type.Optional(
                Type.Array(
                  Type.String({
                    examples: ['packages/*', '!libs/*']
                  }),
                  {
                    description:
                      'A root-relative glob matcher for which packages should be included in the published step. Use `!` to exclude packages.'
                  }
                )
              ),
              names: Type.Optional(
                Type.Array(
                  Type.String({
                    examples: ['@company/package', 'package', '!@company/lib', '!@internal/*']
                  }),
                  {
                    description:
                      'Which package names should be included in the published step. This has priority over paths.'
                  }
                )
              )
            },
            {
              description:
                'Which packages should be included in the published step. Defaults to all.'
            }
          )
        )
      },
      {
        description: 'Configuration related to workspaces and their packages.',
        default: { providers: [] }
      }
    )
  },
  {
    $schema: 'http://json-schema.org/draft-07/schema',
    description: 'The configuration file for Lansa.'
  }
);
