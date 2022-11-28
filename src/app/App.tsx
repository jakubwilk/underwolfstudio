import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { router } from '@app-configs'
import { MantineProvider } from '@mantine/core'

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </MantineProvider>
  )
}

export default App
