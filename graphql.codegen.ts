import type { CodegenConfig } from '@graphql-codegen/cli';
import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files';
 
const config: CodegenConfig = {
  schema: './src/graphql/schema.graphql',
  generates: {
    'src/graphql/schema': defineConfig({
      mode: 'merged',
    }),
  },
};

export default config;
