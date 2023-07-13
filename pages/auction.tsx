import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAddress, useSigner } from '@thirdweb-dev/react'
import { Sepolia } from "@thirdweb-dev/chains"
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm"
import TopNavbarLayout from '../layouts/TopNavbarLayout'
import NFTImage from '../components/NFTDetails/NFTImage'
import NFTAuction from '../components/NFTDetails/NFTAuction'

function NFT() {
  const [listing, setListing] = useState()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const address = useAddress()

//   useEffect(() => {
//     console.log(address)
//     if (!address) router.replace('/')
//   }, [address, router])

  const style = {
    wrapper: `h-[100vh] mx-auto flex max-w-2xl flex-col space-y-4 p-4 dark:bg-[#202226] lg:max-w-none lg:py-8 lg:px-24`,
    nftContainer: `flex flex-col lg:flex-row lg:space-x-4`,
    nftTitle: `pt-6 text-4xl font-bold text-gray-700 dark:text-gray-100`,
    leftContainer: `flex flex-col space-y-4`,
    leftElement: `hidden lg:block`,
    rightContainer: `flex flex-1 flex-col space-y-4`,
    buyoutContainer: `flex-1,`,
  }

  return (
    <TopNavbarLayout>
      <div className={style.wrapper}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className={style.nftContainer}>
            {/* <div className={style.leftContainer}>
              <div className={style.leftElement}>
                <NFTImage image={listing?.asset?.image} />
              </div>
            </div> */}

            <div className={style.rightContainer}>
              <div className={style.nftTitle}>Put your NFT on Auction!</div>

              <div className={style.buyoutContainer}>
                <NFTAuction
                  price={0}
                  symbol='FAKE'
                //   assetContractAddress='contractTest'
                //   tokenID={null}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </TopNavbarLayout>
  )
}

export default NFT
