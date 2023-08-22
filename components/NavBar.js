import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/green-dragon-animation.gif'
import gsap from 'gsap'
import { useRef, useEffect, useState } from 'react'

function NavBar ({account}) {
  const headerRef = useRef()
  const [userName, setUserName] = useState("");
  const [storedUser, storeUser] = useState("")

  useEffect(() => {
    gsap.fromTo(headerRef.current, {opacity: 0}, {opacity: 1, duration: 8, repeat: -1, ease: 'bounce'})
  })

    return (
        <>
            <div className="navbar">
                <Link href="/">
                    <Image src={logo} alt="918Dcx Logo" width={200} height={63}></Image>
                </Link>
                <div className="account-info">
                  {
                    storedUser ? <p>Welcome {storedUser}</p>
                      :
                    <div>
                      <p>Whats Your name?</p>
                        <input 
                           type="text" 
                           placeholder="Enter username" 
                           value={userName} 
                           onChange={e => setUserName(e.target.value)} 
                           style={{ backgroundColor: 'transparent' }}
                        />
                      <button onClick={() => storeUser(userName)}>Create User
                      </button>
                      
                    </div>
                  }
                </div>
            </div>
            <h1 className="top-3 flex justify-center text-[50px]" ref={headerRef}>Dream of Dragons</h1>
        </>
    )
}

export default NavBar
