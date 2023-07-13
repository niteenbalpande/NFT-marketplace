import { useState, useEffect } from 'react'
import Logo from './Logo'
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  CreditCardIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import SearchInput from './SearchInput'
import NavMenus from './NavMenus'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useAddress, useMetamask, useDisconnect } from '@thirdweb-dev/react'
import { useRouter } from 'next/router'


function Header() {
  const [mounted, setMounted] = useState(false)

  const connectWithMetamask = useMetamask()
  const disconnect = useDisconnect()
  const address = useAddress()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const { systemTheme, theme, setTheme } = useTheme()

  const renderThemeChanger = () => {
    if (!mounted) return null

    const currentTheme = theme === 'system' ? systemTheme : theme

    if (currentTheme === 'dark') {
      return (
        <MoonIcon
          className='h-8 w-8 cursor-pointer text-gray-600 transition-all hover:text-black dark:text-gray-300'
          role='button'
          onClick={() => setTheme('light')}
        />
      )
    } else {
      return (
        <SunIcon
          className='h-8 w-8 cursor-pointer text-gray-600 transition-all hover:text-black dark:text-gray-300'
          role='button'
          onClick={() => setTheme('dark')}
        />
      )
    }
  }

  const menus = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Auction NFT',
      href: '/auction',
    },
    // {
    //   name: 'Resources',
    //   href: '#',
    // },
    // {
    //   name: 'Create',
    //   href: '#',
    // },
  ]

  return (
    <header className='sticky top-0 z-50 bg-white px-4 py-2 shadow-md dark:bg-gray-900'>
      <div className='flex items-center justify-between space-x-6'>
        <div className='xl:pr-40'>
          <Link href='/'>
              <Logo />
          </Link>
        </div>

        {/* <div className='ml-8 hidden flex-1 sm:block'>
          <SearchInput />
        </div> */}

        <div className='hidden pr-6 lg:block xl:pl-8'>
          <NavMenus menus={menus} />
        </div>

        <div className='flex items-center space-x-6'>
          {!address ? (
            <div className='flex w-[200px] border-2 border-[#363840] text-[#363840] dark:border-gray-400 dark:text-gray-400 items-center cursor-pointer justify-center space-x-4 rounded-lg py-2' onClick={() => connectWithMetamask()}>
              <CreditCardIcon className='h-6 w-6' />
              <span className='text-lg font-semibold'>Connect wallet</span>
            </div>
            // <CreditCardIcon 
            //   onClick={() => connectWithMetamask()}
            //   className='hidden h-8 w-8 cursor-pointer text-gray-600 transition-all hover:text-black dark:text-gray-300 hover:dark:text-white lg:block'
            // />
          ) : 
            <div className='flex hidden w-[220px] border-2 border-[#363840] text-[#363840] dark:border-gray-400 dark:text-gray-400 items-center cursor-pointer justify-center space-x-4 rounded-lg py-2' onClick={() => disconnect()}>
              <CreditCardIcon className='h-6 w-6' />
              <span className='text-lg font-semibold'>Disconnect wallet</span>
            </div>
          }
          {address ? 
            <UserCircleIcon
              onClick={() => router.push(`/profile`)}
              className='hidden h-8 w-8 cursor-pointer text-gray-600 transition-all hover:text-black dark:text-gray-300 hover:dark:text-white lg:block'
            />
          : ''}
          {renderThemeChanger()}
          {/* <MagnifyingGlassIcon className='h-7 w-7 cursor-pointer text-gray-600 transition-all hover:text-black dark:text-gray-300 hover:dark:text-white sm:hidden' /> */}
          <Bars3Icon className='h-8 w-8 cursor-pointer text-gray-600 transition-all hover:text-black dark:text-gray-300 hover:dark:text-white lg:hidden' />
        </div>
      </div>
    </header>
  )
}

export default Header
