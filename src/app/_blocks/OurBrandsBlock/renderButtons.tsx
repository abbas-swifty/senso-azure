'use client'

import { usePathname } from 'next/navigation'
import classes from './index.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const RenderButtons: React.FC = () => {
  const pathName = usePathname()

  return (
    <div className="flex flex-row gap-3 items-center">
      <Link href={'/contact-us'} className={classes.button}>
        <span>Contact Us</span>
        <Image alt="Arrow Up" width={32} height={32} src={'/assets/icons/ArrowUpRight.svg'} />
      </Link>
      {pathName === '/about' && (
        <Link href={'/build-your-brand'} className={classes.buttonSecondary}>
          <span>Learn More</span>
        </Link>
      )}
    </div>
  )
}

export default RenderButtons
