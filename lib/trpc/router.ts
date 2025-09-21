import { app as electronApp, BrowserWindow, shell } from 'electron'
import { initTRPC } from '@trpc/server'
import { z } from 'zod'

export type RouterContext = {
  app: typeof electronApp
  mainWindow: BrowserWindow
}

const t = initTRPC.context<RouterContext>().create()

const windowRouter = t.router({
  windowInit: t.procedure.query(({ ctx }) => {
    const { mainWindow } = ctx
    const { width, height } = mainWindow.getBounds()
    const minimizable = mainWindow.isMinimizable()
    const maximizable = mainWindow.isMaximizable()
    const platform = process.platform

    return { width, height, minimizable, maximizable, platform }
  }),
  windowIsMinimizable: t.procedure.query(({ ctx }) => ctx.mainWindow.isMinimizable()),
  windowIsMaximizable: t.procedure.query(({ ctx }) => ctx.mainWindow.isMaximizable()),
  windowMinimize: t.procedure.mutation(({ ctx }) => ctx.mainWindow.minimize()),
  windowMaximize: t.procedure.mutation(({ ctx }) => ctx.mainWindow.maximize()),
  windowClose: t.procedure.mutation(({ ctx }) => ctx.mainWindow.close()),
  windowMaximizeToggle: t.procedure.mutation(({ ctx }) =>
    ctx.mainWindow.isMaximized() ? ctx.mainWindow.unmaximize() : ctx.mainWindow.maximize()
  ),
  // Web content operations
  webUndo: t.procedure.mutation(({ ctx }) => ctx.mainWindow.webContents.undo()),
  webRedo: t.procedure.mutation(({ ctx }) => ctx.mainWindow.webContents.redo()),
  webCut: t.procedure.mutation(({ ctx }) => ctx.mainWindow.webContents.cut()),
  webCopy: t.procedure.mutation(({ ctx }) => ctx.mainWindow.webContents.copy()),
  webPaste: t.procedure.mutation(({ ctx }) => ctx.mainWindow.webContents.paste()),
  webDelete: t.procedure.mutation(({ ctx }) => ctx.mainWindow.webContents.delete()),
  webSelectAll: t.procedure.mutation(({ ctx }) => ctx.mainWindow.webContents.selectAll()),
  webReload: t.procedure.mutation(({ ctx }) => ctx.mainWindow.webContents.reload()),
  webForceReload: t.procedure.mutation(({ ctx }) => ctx.mainWindow.webContents.reloadIgnoringCache()),
  webToggleDevtools: t.procedure.mutation(({ ctx }) => ctx.mainWindow.webContents.toggleDevTools()),
  webActualSize: t.procedure.mutation(({ ctx }) => ctx.mainWindow.webContents.setZoomLevel(0)),
  webZoomIn: t.procedure.mutation(({ ctx }) =>
    ctx.mainWindow.webContents.setZoomLevel(ctx.mainWindow.webContents.zoomLevel + 0.5)
  ),
  webZoomOut: t.procedure.mutation(({ ctx }) =>
    ctx.mainWindow.webContents.setZoomLevel(ctx.mainWindow.webContents.zoomLevel - 0.5)
  ),
  webToggleFullscreen: t.procedure.mutation(({ ctx }) => ctx.mainWindow.setFullScreen(!ctx.mainWindow.fullScreen)),
  webOpenUrl: t.procedure.input(z.string()).mutation(({ input }) => shell.openExternal(input)),
})

const appSubRouter = t.router({
  version: t.procedure.query(({ ctx }) => ctx.app.getVersion()),
})

export const router = t.router({
  window: windowRouter,
  app: appSubRouter,
})

export type AppRouter = typeof router
