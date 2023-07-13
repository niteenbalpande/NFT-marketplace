import { AiOutlineSend } from 'react-icons/ai'
import Input from '../Inputs/Input'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm"
import { useSigner } from '@thirdweb-dev/react'

const style = {
  wrapper: `flex flex-col divide-y  border dark:divide-black dark:rounded-lg dark:border-black`,
  header: `flex items-center justify-between rounded-t-lg px-6 py-4 dark:bg-[#262a30]`,
  headerContent: `flex items-center space-x-2`,
  headerIcon: `h-6 w-6`,
  greyText: `text-gray-400`,
  mainContainer: `space-y-4 rounded-b-lg px-6 py-4 dark:bg-[#313339]`,
  priceInfoContainer: `space-y-4`,
  mediumFont: `font-medium`,
  priceContainer: `flex items-center space-x-2`,
  price: `text-3xl font-bold`,
  buttonsContainer: `flex justify-center space-x-4`,
  button: `flex w-[50%] items-center cursor-pointer justify-center space-x-4 rounded-lg py-2 text-white`,
  purchaseButton: `bg-blue-500`,
  offerButton: `border border-black bg-[#363840]`,
  buttonIcon: `h-6 w-6`,
}

const NFTAuction = ({ price, symbol, assetContractAddress = null, tokenID = null }) => {
  const signer = useSigner()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    assetContractAddress: assetContractAddress,
    tokenId: tokenID,
    quantity: 1,
    currencyContractAddress: process.env.NEXT_PUBLIC_FAKE_TOKEN,
    minimumBidAmount: null,
    buyoutBidAmount: null,
    timeBufferInSeconds: "900", // 15 minutes by default
    bidBufferBps: "500", // 5% by default
    startTimestamp: new Date(Date.now()),
    endTimestamp: null,
  })

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    try {
      console.log({ ...form, endTimestamp: new Date(Date.now() + parseInt(form.endTimestamp) * 24 * 60 * 60 * 1000) })
      const sdk = ThirdwebSDK.fromSigner(signer)
      const contract = await sdk.getContract(process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS)
      const tx = await contract.englishAuctions.createAuction({ ...form, endTimestamp: new Date(Date.now() + parseInt(form.endTimestamp) * 24 * 60 * 60 * 1000) });
      const receipt = tx.receipt; // the transaction receipt
      const id = tx.id; // the id of the newly created auction
      console.log(tx, receipt, id)

      setIsLoading(false)
      router.replace('/')
    } catch (error) {
      setIsLoading(false)
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={style.wrapper}>
      {assetContractAddress ? 
        <div className={style.header}>
          <div className={style.headerContent}>

            <div className={style.greyText}>
              {assetContractAddress} - {tokenID}
            </div>
          </div>
        </div>
      : ''}

      <div className={style.mainContainer}>
        <div className={style.priceInfoContainer}>
          {!assetContractAddress ? 
            <>
              <div className='flex-1 sm:block'>
                <Input 
                  label={`Contract Address`}
                  placeholder='e.g.: 0x...'
                  type='text'
                  handleChange={(e) => handleFormFieldChange('assetContractAddress', e)}
                />
              </div>
              <div className='flex-1 sm:block'>
                <Input 
                  label={`Token Id`}
                  placeholder='e.g.: 5'
                  type='number'
                  handleChange={(e) => handleFormFieldChange('tokenId', e)}
                />
              </div>
            </>
          : ''}
          <div className='flex-1 sm:block'>
            <Input 
              label={`Buyout Price Per Token (in ${symbol})`}
              placeholder='e.g.: 10'
              type='number'
              step={0.25}
              handleChange={(e) => handleFormFieldChange('buyoutBidAmount', e)}
            />
          </div>
          <div className='flex-1 sm:block'>
            <Input
              label='Minimum Bid Amount'
              placeholder='e.g.: 1.5'
              type='number'
              step={0.25}
              handleChange={(e) => handleFormFieldChange('minimumBidAmount', e)}
            />
          </div>
          <div className='flex-1 sm:block'>
            <Input 
              label='Auction Duratiion (in days)'
              placeholder='e.g.: 2 days'
              type='number'
              step={1}
              handleChange={(e) => handleFormFieldChange('endTimestamp', e)}
            />
          </div>
        </div>

        <div className={style.buttonsContainer}>
          <button
            type='submit'
            className={`${style.button} ${style.purchaseButton}`}
          >
            <AiOutlineSend className={style.buttonIcon} />
            <span className='text-lg font-semibold'>Submit Auction</span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default NFTAuction
