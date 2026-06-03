import { MantineProvider } from '@mantine/core';
import { render as tlRender } from '@testing-library/react';
import type { ReactElement } from 'react';

export function render(ui: ReactElement) {
  return tlRender(ui, {
    wrapper: ({ children }) => <MantineProvider>{children}</MantineProvider>,
  });
}

export { screen, within, fireEvent, waitFor } from '@testing-library/react';
