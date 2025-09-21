import { trpcClient } from '@/app/trpc/client'

type ApiGroups = 'window' | 'app'

type WindowApi = {
  windowInit: () => Promise<Awaited<ReturnType<typeof trpcClient.window.windowInit.query>>>
  windowIsMinimizable: () => Promise<boolean>
  windowIsMaximizable: () => Promise<boolean>
  windowMinimize: () => Promise<void>
  windowMaximize: () => Promise<void>
  windowClose: () => Promise<void>
  windowMaximizeToggle: () => Promise<void>
  webUndo: () => Promise<void>
  webRedo: () => Promise<void>
  webCut: () => Promise<void>
  webCopy: () => Promise<void>
  webPaste: () => Promise<void>
  webDelete: () => Promise<void>
  webSelectAll: () => Promise<void>
  webReload: () => Promise<void>
  webForceReload: () => Promise<void>
  webToggleDevtools: () => Promise<void>
  webActualSize: () => Promise<void>
  webZoomIn: () => Promise<void>
  webZoomOut: () => Promise<void>
  webToggleFullscreen: () => Promise<void>
  webOpenUrl: (url: string) => Promise<void>
}

type AppApi = {
  version: () => Promise<string>
}

type Api = {
  window: WindowApi
  app: AppApi
}

export const useConveyor = <T extends ApiGroups | undefined = undefined>(
  key?: T
): T extends ApiGroups ? Api[T] : Api => {
  const windowApi: WindowApi = {
    windowInit: () => trpcClient.window.windowInit.query(),
    windowIsMinimizable: () => trpcClient.window.windowIsMinimizable.query(),
    windowIsMaximizable: () => trpcClient.window.windowIsMaximizable.query(),
    windowMinimize: () => trpcClient.window.windowMinimize.mutate(),
    windowMaximize: () => trpcClient.window.windowMaximize.mutate(),
    windowClose: () => trpcClient.window.windowClose.mutate(),
    windowMaximizeToggle: () => trpcClient.window.windowMaximizeToggle.mutate(),
    webUndo: () => trpcClient.window.webUndo.mutate(),
    webRedo: () => trpcClient.window.webRedo.mutate(),
    webCut: () => trpcClient.window.webCut.mutate(),
    webCopy: () => trpcClient.window.webCopy.mutate(),
    webPaste: () => trpcClient.window.webPaste.mutate(),
    webDelete: () => trpcClient.window.webDelete.mutate(),
    webSelectAll: () => trpcClient.window.webSelectAll.mutate(),
    webReload: () => trpcClient.window.webReload.mutate(),
    webForceReload: () => trpcClient.window.webForceReload.mutate(),
    webToggleDevtools: () => trpcClient.window.webToggleDevtools.mutate(),
    webActualSize: () => trpcClient.window.webActualSize.mutate(),
    webZoomIn: () => trpcClient.window.webZoomIn.mutate(),
    webZoomOut: () => trpcClient.window.webZoomOut.mutate(),
    webToggleFullscreen: () => trpcClient.window.webToggleFullscreen.mutate(),
    webOpenUrl: (url: string) => trpcClient.window.webOpenUrl.mutate(url),
  }

  const appApi: AppApi = {
    version: () => trpcClient.app.version.query(),
  }

  const api: Api = { window: windowApi, app: appApi }

  if (key) return api[key] as any
  return api as any
}
