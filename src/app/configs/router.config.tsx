import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from 'app-pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
])

export default router
