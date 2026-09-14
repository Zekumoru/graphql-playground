import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'src/modules/**/schema.graphql',
  documents: 'src/client/**/*.graphql',
  generates: {
    'src/client/generated/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        documentMode: 'string',
        useTypeImports: true,
        emitLegacyCommonJSImports: false,
      },
    },
  },
};

export default config;
