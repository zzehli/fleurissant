import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> 
    <main className="min-h-screen">
        {/* nav bar */}
        <>
        <nav className="shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex-shrink-0 flex items-center">
                <a href="/" className="text-xl font-bold">
                  Fleurissant
                </a>
              </div>

              <div className="flex items-center">
                <Button variant="ghost" className="px-3 py-2 rounded-md text-sm font-medium">
                  <a href="/">Home</a>
                </Button>
                <Button variant="ghost" className="px-3 py-2 rounded-md text-sm font-medium">
                  Collection
                </Button>
                <Button variant="ghost" className="px-3 py-2 rounded-md text-sm font-medium">
                  About
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </>
      {/* hero section */}
      <>
        <div className="">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Welcome to <span className="text-primary">Fleurissant</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover our house plants collection that will bring a touch of nature to your home.
            </p>
            {/* <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                  Shop Now
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                  Learn More
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      </>
    </main>
    </ThemeProvider>
  )
}

export default App
