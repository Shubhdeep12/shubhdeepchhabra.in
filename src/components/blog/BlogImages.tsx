'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface BlogImagesProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	className?: string;
}

const BlogImages = ({ src, alt, width, height, className }: BlogImagesProps) => {
	const [expandImage, setExpandImage] = useState(false);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!expandImage) return;

		closeButtonRef.current?.focus();
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setExpandImage(false);
			}
		};

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [expandImage]);

	return (
		<div key={src}>
			<button
				type='button'
				onClick={() => setExpandImage(true)}
				className='rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
				aria-label={`Open expanded image: ${alt}`}
			>
				<Image
					alt={alt}
					src={src}
					width={width || 800}
					height={height || 400}
					className={clsx('rounded-md', className)}
					priority
				/>
			</button>

			<div
				key={src}
				className={clsx(
					expandImage ? 'fixed no-scroll' : 'hidden',
					'top-0 left-0 w-screen h-screen bg-black/65 backdrop-blur-md flex justify-center items-center transition-opacity duration-300 z-20',
					expandImage ? 'opacity-100' : 'opacity-0'
				)}
				onClick={() => setExpandImage(false)}
				role='dialog'
				aria-modal='true'
				aria-label={alt}
			>
				<div
					className={clsx(
						'relative touch-pinch-zoom transition-transform duration-300',
						expandImage ? 'scale-100' : 'scale-75'
					)}
				>
					<Image
						alt={alt}
						src={src}
						width={100}
						height={100}
						className='w-auto h-auto laptop:max-w-4xl max-w-full m-0 shadow-xl rounded-md'
						onClick={(e) => e.stopPropagation()}
					/>

					<button
						ref={closeButtonRef}
						type='button'
						className='absolute top-2 right-2 rounded-full text-white bg-black/70 p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
						onClick={() => setExpandImage(false)}
						aria-label='Close expanded image'
					>
						<IoClose size={28} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default BlogImages;
