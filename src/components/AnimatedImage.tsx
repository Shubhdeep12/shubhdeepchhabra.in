'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

type AnimatedImageProps = {
	className: string;
	src: string;
	width: number;
	height: number;
	alt: string;
	[x: string | number | symbol]: unknown;
};
const AnimatedImage = ({ className, src, width, height, alt, ...props }: AnimatedImageProps) => {
	const [isLoading, setIsLoading] = useState(true);
	return (
		<div className={clsx(className, 'relative flex overflow-hidden')}>
			<Image
				className={clsx(className, 'duration-700 ease-in-out object-contain', isLoading ? 'blur-2xl' : 'blur-0')}
				src={src}
				width={width}
				height={height}
				alt={alt}
				priority
				quality={95}
				onLoadingComplete={() => setIsLoading(false)}
				{...props}
			/>
		</div>
	);
};

export default AnimatedImage;
