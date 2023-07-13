import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sepolia } from "@thirdweb-dev/chains"
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm"
import NFTCard from './NFTCard'
import { BigNumber } from 'ethers'
import { useAddress } from '@thirdweb-dev/react'

const style = {
  wrapper: `px-12 pb-12 grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`,
}

const Listings = ({ profile }) => {
  const address = useAddress()
  const [listings, setListings] = useState([])
  
  useEffect(() => {
    const sdk = new ThirdwebSDK(Sepolia)
    const getListings = async () => {
      try {
        const contract = await sdk.getContract(process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS);
        
        let list = []
        if (profile) {
          list = await contract.directListings.getAll()
          list = await setOwnable(list, contract)
          console.log(list)
        } else {
          list = await contract.directListings.getAllValid()
          console.log(list)
        }

        setListings(list)
      } catch (error) {
        console.error(error)
      }
    }

    const setOwnable = async (list, contract) => {
      const events = await contract.events.getEvents("NewSale")
      
      list.map(e => {
        const isOwner = events.find(event => { 
          return event.data.tokenId._hex === BigNumber.from(e.tokenId)._hex && event.data.buyer === address
        })
        
        e.owner = isOwner ? true : false 
      })

      return list.filter(e => e.owner)
    }

    getListings()
  }, [profile, address])

  return (
    <div className={style.wrapper}>
      {listings.length > 0 ? (
        <>
          {listings?.map((listing, index) => (
            <Link
              key={index}
              href={`${profile ? '/auction/' : '/assets/'}${listing.assetContractAddress}/${listing.id}`}
            >
              <NFTCard listing={listing} profile={profile} />
            </Link>
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Listings
