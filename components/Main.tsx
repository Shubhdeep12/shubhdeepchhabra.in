import React from 'react'

type MainProps = {
	children?: React.ReactNode
}
export default function Main({ children }: MainProps) {
	return (
		<div
			className='
      animate-page-transition 
      [animation-delay:150ms]
      w-full
      max-w-laptop
      mx-auto
			pt-[72px]
  '
		>
			{children}
		</div>
	)
}
