type MainProps = {
	children?: React.ReactNode;
};
export default function MainContent({ children }: MainProps) {
	return (
		<main
			id='main-content'
			style={{
				margin: '0 auto',
				width: '100%',
				padding: '0 36px',
				paddingTop: '36px',
				fontSize: '14px',
				lineHeight: '1.65',
			}}
		>
			{children}
		</main>
	);
}
