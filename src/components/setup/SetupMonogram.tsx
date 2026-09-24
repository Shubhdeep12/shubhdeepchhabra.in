import clsx from 'clsx';
import Image from 'next/image';
import { hueFor, monogramFor } from '@/src/utils/setup';

type SetupMonogramProps = {
	name: string;
	image?: string;
	size?: 'sm' | 'md';
	className?: string;
};

export default function SetupMonogram({ name, image, size = 'md', className }: SetupMonogramProps) {
	return (
		<span
			className={clsx('setup-mono', size === 'sm' && 'setup-mono--sm', className)}
			style={{ '--h': hueFor(name) } as React.CSSProperties}
			aria-hidden='true'
		>
			{image ? (
				<Image src={image} alt='' fill sizes='48px' className='object-cover' />
			) : (
				<span className='setup-mono-text'>{monogramFor(name)}</span>
			)}
		</span>
	);
}
