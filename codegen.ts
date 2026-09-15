import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  generates: {
    'src/client/generated/': {
      schema: 'src/modules/**/schema.graphql',
      documents: 'src/client/**/*.graphql',
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
    'src/appsync/client/generated/': {
      schema: 'src/appsync/schema.graphql',
      documents: 'src/appsync/client/**/*.graphql',
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
