// import { useAddress, useMetamask } from '@thirdweb-dev/react'
import React from 'react'

import Home from '../components/Home'

// const style = {
//   wrapper: `flex h-screen items-center justify-center`,
//   connectWalletButton: `rounded-lg border border-black px-10 py-5 transition-all hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black`,
// }

export default function Main() {
  // const connectWithMetamask = useMetamask()
  // const address = useAddress()

  // const Auth = () => {
  //   return (
  //     <div className={style.wrapper}>
  //       <button
  //         onClick={() => connectWithMetamask()}
  //         className={style.connectWalletButton}
  //       >
  //         Connect Metamask
  //       </button>
  //     </div>
  //   )
  // }

  // return <>{address ? <Home /> : Auth()}</>
  return <Home />
}