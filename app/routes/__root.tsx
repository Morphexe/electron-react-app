import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Button } from '../components/ui/button'
import { Separator } from '../components/ui/separator'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="mr-4 flex">
              <Link to="/" className="mr-6 flex items-center space-x-2">
                <span className="font-bold">Electron React App</span>
              </Link>
            </div>
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <nav className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/" className="[&.active]:bg-accent [&.active]:text-accent-foreground">
                    Home
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/about" className="[&.active]:bg-accent [&.active]:text-accent-foreground">
                    About
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/settings" className="[&.active]:bg-accent [&.active]:text-accent-foreground">
                    Settings
                  </Link>
                </Button>
              </nav>
            </div>
          </div>
        </nav>
        
        {/* Main content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
})
