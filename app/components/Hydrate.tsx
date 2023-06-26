'use client'
import {ReactNode,useEffect,useState} from 'react'
import SpinnerLoading from '@/public/spinnerdots.json'
import { Player } from '@lottiefiles/react-lottie-player'
import { useThemeStore } from '@/store'
export default function Hydrate({children}:{children:ReactNode}) {
    const [isHydrated,setHydrated]= useState(false)
    const themestore=useThemeStore()
    //wait till nextjs rehydration completes
    useEffect(()=>{
        setHydrated(true)
    },[])
  return (
    <div>
      {isHydrated ? (<body data-theme={themestore.mode} className="px-4 lg:px-48 font-roboto">{children}</body>):
      (
     <body>
      
     </body>
       ) }
    </div>
  )

      }

{/* <div className='flex flex-col justify-center items-center h-96'>
        <Player autoplay loop src={SpinnerLoading}>
        </Player></div>} */}
