type PageHeaderProps = {
	title: string;
	description?: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
	return (
		<header className='flex flex-col gap-3'>
			<h1 className='text-h1 font-bold tracking-tight text-text-default'>{title}</h1>
			{description ? <p className='max-w-prose text-body text-text-muted'>{description}</p> : null}
		</header>
	);
}
