import { exposeElectronTRPC } from 'trpc-electron/main'

// Expose tRPC IPC bridge to the renderer
process.once('loaded', async () => {
  try {
    exposeElectronTRPC()
  } catch (error) {
    console.error(error)
  }
})
