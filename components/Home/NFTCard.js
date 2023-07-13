import Image from 'next/image'
import { AiFillPlusCircle } from 'react-icons/ai'

const style = {
  wrapper: `relative flex max-w-sm cursor-pointer flex-col rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-2xl dark:bg-[#333333]`,
  imageContainer: `w-full h-full overflow-hidden`,
  nftImage: `rounded-t-lg object-cover`,
  nftLowerContainer: `flex h-1/4 flex-col justify-between p-4`,
  nftInfoContainer: `flex justify-between`,
  collectionTitle: `text-sm text-gray-500 dark:text-gray-400`,
  nftTitle: `text-sm font-bold`,
  priceContainer: `flex flex-col items-end justify-center space-y-1`,
  priceTitle: `text-xs font-light`,
  wethImageContainer: `flex items-center space-x-1`,
  priceValue: `text-sm font-semibold`,
  auctionContainer: `flex items-center justify-end space-x-2`,
  heartIcon: `h-5 w-5 text-gray-500 dark:text-gray-400`,
  auctionLabel: `text-sm text-gray-500 dark:text-gray-400`,
}

const NFTCard = ({ listing, profile }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.imageContainer}>
        <Image
          className={style.nftImage}
          src={listing.asset.image}
          height={384}
          width={384}
          alt='nft'
        />
      </div>

      <div className={style.nftLowerContainer}>
        <div className={style.nftInfoContainer}>
          <div>
            {listing.asset.collection && (
              <div className={style.collectionTitle}>
                {listing.asset?.collection?.name}
              </div>
            )}

            <div className={style.nftTitle}>{listing.asset.name}</div>
          </div>

          {!profile ? (
              <div className={style.priceContainer}>
              <div className={style.priceTitle}>Price</div>
              <div className={style.wethImageContainer}>
                <Image height={24} width={24} src='/fake-logo.png' alt='fake' />
                <div className={style.priceValue}>
                  {listing.currencyValuePerToken?.displayValue} {listing.currencyValuePerToken?.symbol}
                </div>
              </div>
            </div>
          ) : ''}
        </div>

        {profile ? (
          <div className={style.auctionContainer}>
            <AiFillPlusCircle className={style.heartIcon} />
            <div className={style.auctionLabel}>
              Put on Auction
            </div>
          </div>
        ) : ''}

      </div>
    </div>
  )
}

export default NFTCard
