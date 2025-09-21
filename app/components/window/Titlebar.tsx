import { useWindowContext } from './WindowContext'
import { useConveyor } from '@/app/hooks/use-conveyor'
import { Minimize2, Maximize2, X } from 'lucide-react'

export const Titlebar = () => {
  const { title, icon, titleCentered } = useWindowContext().titlebar
  const { window: wcontext } = useWindowContext()


  return (
    <div className={`window-titlebar ${wcontext?.platform ? `platform-${wcontext.platform}` : ''}`}>
      {wcontext?.platform === 'win32' && (
        <div className="window-titlebar-icon">
          <img src={icon} />
        </div>
      )}

      <div
        className="window-titlebar-title"
        {...(titleCentered && { 'data-centered': true })}
      >
        {title}
      </div>
      {<TitlebarControls />}
    </div>
  )
}

const TitlebarControls = () => {
  const { window: wcontext } = useWindowContext()

  return (
    <div className="window-titlebar-controls">
      {wcontext?.minimizable && <TitlebarControlButton label="minimize" icon={Minimize2} />}
      {wcontext?.maximizable && <TitlebarControlButton label="maximize" icon={Maximize2} />}
      <TitlebarControlButton label="close" icon={X} />
    </div>
  )
}

const TitlebarControlButton = ({ icon: Icon, label }: { icon: React.ComponentType<{ size?: number; className?: string }>; label: string }) => {
  const { windowMinimize, windowMaximizeToggle, windowClose } = useConveyor('window')

  const handleAction = () => {
    const actions = {
      minimize: windowMinimize,
      maximize: windowMaximizeToggle,
      close: windowClose,
    }
    actions[label as keyof typeof actions]?.()
  }

  return (
    <div aria-label={label} className="titlebar-controlButton" onClick={handleAction}>
      <Icon size={16} className="titlebar-controlIcon" />
    </div>
  )
}

export interface TitlebarProps {
  title: string
  titleCentered?: boolean
  icon?: string
}
