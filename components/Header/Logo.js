import Image from 'next/image'

function Logo() {
  return (
    <div className='flex cursor-pointer items-center space-x-3'>
      <Image src='/fake-logo.png' width={48} height={48} alt='Logo' />
      <h1 className='font-rajdhani font-bold dark:text-white sm:text-2xl text-xl'>Marketplace</h1>
    </div>
  )
}

export default Logo
