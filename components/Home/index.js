import { useState, useEffect } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAddress } from '@thirdweb-dev/react'
import { MdVerified } from 'react-icons/md'
import TopNavbarLayout from '../../layouts/TopNavbarLayout'
import CollectionStats from '../Collection/CollectionStats'
import { doodlesCollection } from '../../static/collections'
import Listings from './Listings'

const style = {
  wrapper: `flex flex-col dark:bg-[#202226] relative flex flex-col pt-7`,
  container: `relative flex h-[650px] flex-col`,
  bannerContainer: `absolute h-1/3 w-full object-center`,
  banner: `object-cover object-center`,
  collectionInfoWrapper: `absolute inset-0 top-1/3 z-10 h-2/3 -translate-y-16`,
  collectionInfoContainer: `flex flex-col items-center space-y-4`,
  collectionLogoContainer: `flex items-center justify-center rounded-2xl border-4 border-gray-100`,
  collectionLogo: `rounded-xl object-cover`,
  collectionInfo: `flex flex-col items-center space-y-6`,
  title: `text-4xl font-bold`,
  creatorInfoContainer: `flex items-center space-x-1`,
  creator: `text-sm font-medium text-gray-500`,
  creatorName: `cursor-pointer text-blue-500`,
  verified: `h-5 w-5 text-blue-500`,
  descriptionContainer: `max-w-3xl py-2 px-10 text-center text-gray-500`,
}

export default function Home({ profile = false }) {
  const address = useAddress()
  const [collection, setCollection] = useState(doodlesCollection)
  const router = useRouter()
  const { slug } = router.query

  // useEffect(() => {
  //   if (!address) router.replace('/')
  // }, [address, router])

  useEffect(() => {
    if (!slug) return
    ;(async () => {
      const collectionData = await getCollection()

      setCollection(collectionData)
    })()
  }, [slug])

  return (
    <div>
      <Head>
        <title>NFT marketplace</title>
      </Head>

      <TopNavbarLayout>
        <div className={style.wrapper}>
          {/* <div className={style.container}>
            <div className={style.bannerContainer}>
              <Image
                className={style.banner}
                src={collection?.banner_image_url}
                alt='banner'
                fill
              />
            </div>

            <div className={style.collectionInfoWrapper}>
              <div className={style.collectionInfoContainer}>
                <div className={style.collectionLogoContainer}>
                  <Image
                    className={style.collectionLogo}
                    src={collection?.image_url}
                    height={128}
                    width={128}
                    alt='logo'
                  />
                </div>

                <div className={style.collectionInfo}>
                  <div className={style.title}>{profile ? 'Your NTFs' : collection?.name}</div>

                  <div className={style.creatorInfoContainer}>
                    <div className={style.creator}>
                      Created by{' '}
                      <span className={style.creatorName}>
                        {collection?.creator}
                      </span>
                    </div>
                    <MdVerified className={style.verified} />
                  </div>
                </div>

                {!profile ? <CollectionStats stats={collection?.stats} /> : ''}

                <div className={style.descriptionContainer}>
                  {collection?.description}
                </div>
              </div>
            </div>
          </div> */}

          <Listings profile={profile} />
        </div>
      </TopNavbarLayout>
    </div>
  )
}
