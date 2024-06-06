type MainProps = {
	children?: React.ReactNode
}
export default function MainContent({ children }: MainProps) {
	return (
		<main
			className='
      w-full
      max-w-laptop
      mx-auto
			pt-[110px]
			pb-10
			overflow-hidden
			px-2

  '
		>
			{children}
		</main>
	)
}
