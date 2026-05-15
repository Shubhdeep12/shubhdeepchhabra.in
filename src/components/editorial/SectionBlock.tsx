import { PropsWithChildren } from 'react';

type SectionBlockProps = PropsWithChildren<{
	title?: string;
	description?: string;
}>;

export default function SectionBlock({ title, description, children }: SectionBlockProps) {
	return (
		<section className='flex flex-col gap-4'>
			{title ? <h2 className='text-h2 font-semibold tracking-tight text-text-default'>{title}</h2> : null}
			{description ? <p className='max-w-prose text-body text-text-muted'>{description}</p> : null}
			{children}
		</section>
	);
}
