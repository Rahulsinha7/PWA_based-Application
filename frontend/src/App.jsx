import { useEffect, useState } from 'react'
import './index.css'
import Sidebar from "./components/Sidebar";
import GoalManager from "./components/GoalManager";
import Calendar from "./components/Calendar";
import Quotes from "./components/Quotes";


function App() {
    const [deferredPrompt, setDeferredPrompt] = useState(null)

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault()
            setDeferredPrompt(e)
        }

        if (window.matchMedia('(display-mode: standalone)').matches) {
            setDeferredPrompt(null) 
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        }
    }, [])

    const handleInstallClick = async () => {
        if (!deferredPrompt) return

        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        console.log(`User response to the install prompt: ${outcome}`)
        setDeferredPrompt(null)
    }

    return (
        <>
        <div>
            {deferredPrompt && (
                <button onClick={handleInstallClick} className='fixed bottom-5 right-5 z-50 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg transition duration-300'>
                    Install App
                </button>
            )}
        </div>
         <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-4 pb-16">
        <GoalManager />
        <Calendar />
      </main>
 
      <Quotes />
    </div>
        </>
    )
}

export default App
