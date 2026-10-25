import { MantineProvider } from '@mantine/core';
import { render as tlRender } from '@testing-library/react';
import type { ReactElement } from 'react';

import { theme } from '@/modules/common/utils/theme';

export function render(ui: ReactElement) {
  return tlRender(ui, {
    wrapper: ({ children }) => <MantineProvider theme={theme}>{children}</MantineProvider>,
  });
}

export { screen, within, fireEvent, waitFor } from '@testing-library/react';
