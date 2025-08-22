import Image from "next/image"

interface LogoProps {
  variant?: "horizontal" | "vertical" | "icon"
  className?: string
}

export function Logo({ variant = "horizontal", className = "" }: LogoProps) {
  if (variant === "icon") {
    return (
      <div className={`w-10 h-10 ${className}`}>
        <Image
          src="/images/eat-yui-logo.jpg"
          alt="EAT結"
          width={40}
          height={40}
          className="w-full h-full object-contain"
        />
      </div>
    )
  }

  if (variant === "vertical") {
    return (
      <div className={`w-20 h-32 ${className}`}>
        <Image
          src="/images/eat-yui-logo.jpg"
          alt="EAT結"
          width={80}
          height={128}
          className="w-full h-full object-contain"
        />
      </div>
    )
  }

  return (
    <div className={`h-12 ${className}`}>
      <Image
        src="/images/eat-yui-logo.jpg"
        alt="EAT結"
        width={120}
        height={48}
        className="h-full w-auto object-contain"
        priority
      />
    </div>
  )
}
