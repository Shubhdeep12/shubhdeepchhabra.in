'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

type BlogImagesProps = {
	src: string;
	alt: string;
};

const BlogImages = ({ alt, src }: BlogImagesProps) => {
	const [expandImage, setExpandImage] = useState(false);

	return (
		<div key={src}>
			<Image
				alt={alt}
				src={src}
				width={100}
				height={100}
				className='rounded-lg w-full h-auto cursor-zoom-in transition-transform duration-300 transform hover:scale-105'
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
						className='w-auto h-auto max-w-4xl m-0 shadow-xl rounded-lg'
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
