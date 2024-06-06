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
		<div>
			<Image
				alt={alt}
				src={src}
				width={100}
				height={100}
				className='rounded-lg w-full h-auto cursor-zoom-in'
				onClick={() => setExpandImage((prev) => !prev)}
			/>

			<div
				className={clsx(
					expandImage ? 'fixed no-scroll' : 'hidden',
					'top-0 left-0 transition-all w-screen h-screen backdrop-blur-md flex justify-center items-center'
				)}
				onClick={() => setExpandImage(false)}
			>
				<div className={'relative rounded-lg touch-pinch-zoom'}>
					<Image
						alt={alt}
						src={src}
						width={100}
						height={100}
						className={'w-auto h-auto max-w-4xl m-0'}
						onClick={(e) => e.stopPropagation()}
					/>

					<IoClose className='absolute bottom-full right-2 rounded-full  cursor-pointer' size={32} />
				</div>
			</div>
		</div>
	);
};

export default BlogImages;
