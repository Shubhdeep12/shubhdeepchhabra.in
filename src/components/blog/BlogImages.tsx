'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
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

	return (
		<div key={src}>
			<Image
				alt={alt}
				src={src}
				width={width || 800}
				height={height || 400}
				className={clsx('rounded-lg', className)}
				priority
				onClick={() => setExpandImage(true)}
			/>

			<div
				key={src}
				className={clsx(
					expandImage ? 'fixed no-scroll' : 'hidden',
					'top-0 left-0 w-screen h-screen backdrop-blur-md flex justify-center items-center transition-opacity duration-300 z-10',
					expandImage ? 'opacity-100' : 'opacity-0'
				)}
				onClick={() => setExpandImage(false)}
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
						className='w-auto h-auto laptop:max-w-4xl max-w-full m-0 shadow-xl rounded-lg'
						onClick={(e) => e.stopPropagation()}
					/>

					<IoClose
						className='absolute top-2 right-2 rounded-full cursor-pointer text-white bg-black p-1'
						size={32}
						onClick={() => setExpandImage(false)}
					/>
				</div>
			</div>
		</div>
	);
};

export default BlogImages;
