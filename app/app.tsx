import './styles/app.css'
import { useState } from 'react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card'
import { Separator } from './components/ui/separator'

export default function App() {
  const [name, setName] = useState('')

  return (
    <div className="min-h-full w-full bg-background text-foreground p-6">
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>A quick ShadCN UI check inside Electron + Vite.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="name">Your name</Label>
              <Input
                id="name"
                placeholder="Ada Lovelace"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <Separator />
            <p className="text-sm text-muted-foreground">
              This template uses Tailwind v4 and ShadCN-style components.
            </p>
          </CardContent>
          <CardFooter className="justify-between">
            <div className="text-sm text-muted-foreground">
              {name ? `Hello, ${name}!` : 'Enter your name above'}
            </div>
            <Button onClick={() => setName('')}>Clear</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
