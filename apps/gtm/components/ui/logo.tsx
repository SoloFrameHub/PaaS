import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link className="block" href="/">
      <Image
        src="/images/soloframehub-logo-main.png"
        alt="SoloFrameHub"
        width={180}
        height={48}
        className="h-9 w-auto"
      />
    </Link>
  )
}
