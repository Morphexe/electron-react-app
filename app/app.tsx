import './styles/app.css'
import { RouterProvider, createRouter, createHashHistory } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClientProvider } from '@tanstack/react-query'
import { trpc, trpcClient, queryClient } from './trpc/client'

const router = createRouter({
  routeTree,
  history: createHashHistory(),
})

export default function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
  )
}
