import { createTRPCReact, createTRPCClient, type CreateTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@/lib/trpc/router'
import { ipcLink } from 'trpc-electron/renderer'
import { QueryClient } from '@tanstack/react-query'

export const trpc: CreateTRPCReact<AppRouter, unknown> = createTRPCReact<AppRouter, unknown>()

export const queryClient = new QueryClient()

export const trpcClient = createTRPCClient<AppRouter>({
  links: [ipcLink()],
})
