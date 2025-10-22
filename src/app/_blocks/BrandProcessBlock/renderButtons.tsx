'use client'

import { usePathname } from 'next/navigation'
import classes from './index.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const RenderButtons: React.FC = () => {
  const pathName = usePathname()

  return (
    <>
      {pathName === '/distributors' ? (
        <div>
          <Link href="#top" className={classes.button}>
          <span>Become a Distriubutor</span>
            <Image alt="Arrow Up" width={32} height={32} src={'/assets/icons/ArrowUpRight.svg'} />
          </Link>
        </div>
      ) : (
        <div>
          <Link href={'/contact-us'} className={classes.button}>
            <span>Contact Us</span>
            <Image alt="Arrow Up" width={32} height={32} src={'/assets/icons/ArrowUpRight.svg'} />
          </Link>
        </div>
      )}
    </>
  )
}

export default RenderButtons
