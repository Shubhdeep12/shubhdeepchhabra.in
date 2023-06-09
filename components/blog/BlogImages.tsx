import Image from 'next/image'

type BlogImagesProps = {
	src: string
	alt: string
}

const BlogImages = ({ alt, src }: BlogImagesProps) => {
	return <Image alt={alt} src={src} width={100} height={100} className='rounded-lg w-full h-auto' />
}

export default BlogImages
