import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAddress, useSigner } from '@thirdweb-dev/react'
import { Sepolia } from "@thirdweb-dev/chains"
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm"
import TopNavbarLayout from '../../../layouts/TopNavbarLayout'
import NFTBasicInfo from '../../../components/NFTDetails/NFTBasicInfo'
import NFTDetails from '../../../components/NFTDetails/NFTDetails'
import NFTImage from '../../../components/NFTDetails/NFTImage'
import NFTSalesInfo from '../../../components/NFTDetails/NFTSalesInfo'

function NFT() {
  const [listing, setListing] = useState()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { tokenID } = router.query

  const address = useAddress()
  const signer = useSigner()

  useEffect(() => {
    const sdk = new ThirdwebSDK(Sepolia)
    const getListing = async () => {
      try {
        setLoading(true)
        const contract = await sdk.getContract(process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS)
        const listing = await contract.directListings.getListing(tokenID)
  
        setListing(listing)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    getListing()
  }, [tokenID])

  useEffect(() => {
    if (!address) router.replace('/')
  }, [address, router])

  

  const buyNFT = async () => {
    try {
      const sdk = ThirdwebSDK.fromSigner(signer)
      const contract = await sdk.getContract(process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS)
      await contract.directListings.buyFromListing(tokenID, 1, address)

      router.replace('/')
    } catch (error) {
      console.error(error)
    }
  }

  const style = {
    wrapper: `mx-auto mb-md flex max-w-2xl flex-col space-y-4 p-4 dark:bg-[#202226] lg:max-w-none lg:py-8 lg:px-24`,
    nftContainer: `flex flex-col lg:flex-row lg:space-x-4`,
    leftContainer: `flex flex-col space-y-4`,
    leftElement: `lg:block`,
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
            <div className={style.leftContainer}>
              <div className={style.leftElement}>
                <NFTImage image={listing?.asset?.image} />
              </div>

              <div className={style.leftElement}>
                <NFTDetails />
              </div>
            </div>

            <div className={style.rightContainer}>
              <NFTBasicInfo name={listing?.asset?.name} />

              <div className={style.buyoutContainer}>
                <NFTSalesInfo
                  price={`${listing?.currencyValuePerToken?.displayValue} ${listing?.currencyValuePerToken?.symbol}`}
                  buyNFT={buyNFT}
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
