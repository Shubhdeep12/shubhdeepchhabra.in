'use client'
type MainProps = {
	children?: React.ReactNode
}
export default function MainContent({ children }: MainProps) {
	return (
		<main
			className='
      animate-page-transition 
      [animation-delay:150ms]
      w-full
      max-w-laptop
      mx-auto
			pt-[110px]
			pb-10
			overflow-x-hidden
			px-2
  '
		>
			{children}
		</main>
	)
}
