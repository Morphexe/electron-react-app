import './styles/app.css'
import { RouterProvider, createRouter, createHashHistory } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClientProvider } from '@tanstack/react-query'
import { trpc, trpcClient, queryClient } from './trpc/client'
import { ConvexReactClient } from 'convex/react'
import { ConvexAuthProvider } from '@convex-dev/auth/react'

const router = createRouter({
  routeTree,
  history: createHashHistory(),
})

const convexUrl = (import.meta as any).env?.VITE_CONVEX_URL
if (!convexUrl) {
  throw new Error('VITE_CONVEX_URL is not defined')
}

const convex = new ConvexReactClient(convexUrl, {
  logger: true,
  verbose: true,
})

export default function App() {
  return (
    <ConvexAuthProvider client={convex}>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
    </ConvexAuthProvider>
  )
}
