export type TextButtonProps = {
	children?: React.ReactNode | string;
};

export default function TextButton({ children = '' }: TextButtonProps) {
	return <div>{children}</div>;
}
