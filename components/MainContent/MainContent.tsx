'use client'
type MainProps = {
	children?: React.ReactNode
}
export default function MainContent({ children }: MainProps) {
	return (
		<div
			className='
      animate-page-transition 
      [animation-delay:150ms]
      w-full
      max-w-laptop
      mx-auto
			pt-[110px]
			pb-10
  '
		>
			{children}
		</div>
	)
}
