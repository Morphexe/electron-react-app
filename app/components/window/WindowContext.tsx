import { createContext, useContext, useEffect, useState } from 'react'
import { Titlebar, TitlebarProps } from './Titlebar'
import { TitlebarContextProvider } from './TitlebarContext'
import { useConveyor } from '@/app/hooks/use-conveyor'
import { trpcClient } from '@/app/trpc/client'

type WindowInitProps = Awaited<ReturnType<typeof trpcClient.window.windowInit.query>>

interface WindowContextProps {
  titlebar: TitlebarProps
  readonly window: WindowInitProps | undefined
}

const WindowContext = createContext<WindowContextProps | undefined>(undefined)

export const WindowContextProvider = ({
  children,
  titlebar = {
    title: 'Electron React App',
    icon: 'appIcon.png',
    titleCentered: false,
  },
}: {
  children: React.ReactNode
  titlebar?: TitlebarProps
}) => {
  const [initProps, setInitProps] = useState<WindowInitProps>()
  const { windowInit } = useConveyor('window')

  useEffect(() => {
    windowInit().then(setInitProps)

    // Add class to parent element
    const parent = document.querySelector('.window-content')?.parentElement
    parent?.classList.add('window-frame')
  }, [windowInit])

  return (
    <WindowContext.Provider value={{ titlebar, window: initProps }}>
      <TitlebarContextProvider>
        <Titlebar />
      </TitlebarContextProvider>
      <div className="window-content">{children}</div>
    </WindowContext.Provider>
  )
}

export const useWindowContext = () => {
  const context = useContext(WindowContext)
  if (!context) {
    throw new Error('useWindowContext must be used within a WindowContextProvider')
  }
  return context
}
