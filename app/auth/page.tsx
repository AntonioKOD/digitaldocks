'use client'

import { useState } from 'react'
import { SignUp } from '@/components/SignUp'
import { Login } from '@/components/Login'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to DigitalMarket</CardTitle>
          <CardDescription>Sign up or log in to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Login />
            </TabsContent>
            <TabsContent value="signup">
              <SignUp />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to our{' '}
            <a href="/terms" className="underline">Terms of Service</a>{' '}
            and{' '}
            <a href="/privacy" className="underline">Privacy Policy</a>.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
