type MainProps = {
	children?: React.ReactNode;
};
export default function MainContent({ children }: MainProps) {
	return (
		<main
			className='
      w-full
			pt-[110px]
			pb-10
			overflow-x-visible
			px-2

  '
		>
			{children}
		</main>
	);
}
