import React from 'react'

function Footer() {
  const [scroll, setScroll] = React.useState(false)
  React.useEffect(()=>{
    window.addEventListener('scroll',()=>{
      setScroll(window.scrollY>50)
    })
    return ()=>{
      window.removeEventListener('scroll',window)
    }
  },[])

  return (
    <div className={`fixed bottom-0 transition-all duration-300 bg-slate-50 w-screen text-black text-center py-2 font-semibold tracking-wider px-2 text-sm border-[3.5px] border-[#3771d2] ${scroll ? "opacity-0 translate-y-2":"opacity-100 translate-y-0"}`}>Empowering renters with trusted insights.</div>
  )
}

export default Footer