import Image from 'next/image'
import { AiOutlineHeart } from 'react-icons/ai'

const style = {
  wrapper: `rounded-lg border dark:border-transparent dark:bg-[#313339]`,
  nftHeader: `flex items-center justify-between px-4 py-2`,
  likesContainer: `flex items-center justify-end space-x-2`,
  heartIcon: `h-5 w-5 text-gray-500 dark:text-gray-400`,
  likesCount: `text-sm font-semibold text-gray-500 dark:text-gray-400`,
  nftImage: `rounded-b-lg object-cover`,
}

function NFTImage({ image }) {
  return (
    <div className={style.wrapper}>
      <div className={style.nftHeader}>
        <Image height={32} width={32} src='/fake-logo.png' alt='$FAKE' />

        <div className={style.likesContainer}>
          <AiOutlineHeart className={style.heartIcon} />
          <div className={style.likesCount}>200</div>
        </div>
      </div>

      <div>
        {image && (
          <Image
            className={style.nftImage}
            height={576}
            width={576}
            src={image}
            alt='NFT Image'
          />
        )}
      </div>
    </div>
  )
}

export default NFTImage
