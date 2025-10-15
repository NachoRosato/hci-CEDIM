import 'twin.macro';
import styledImport from 'styled-components';
import { css as cssImport } from 'styled-components';

declare module 'twin.macro' {
  // styled-components
  const styled: typeof styledImport;
  const css: typeof cssImport;
}

