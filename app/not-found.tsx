import Button from '@/components/Button'
import Text from '@/components/Text'
import Link from 'next/link'

const NotFound = () => {
	return (
		<section className='flex flex-col items-start gap-5 min-h-[500px] font-semibold'>
			<Text shadow shadowColor='purple' className='font-bold text-3xl text-heading-dark'>
				OOPS! Page not found.
			</Text>
			<p className='mt-5'>{"Unfortunately, the page you're looking for doesn't exist."}</p>
			<p className='mb-5'>Please double check the URL. Otherwise,</p>
			<Button
				height='h-[42px]'
				width='w-fit'
				focusOutlined
				className='p-4 flex gap-1 justify-center items-center rounded-lg bg-blue-700 hover:-translate-y-[1px] hover:shadow-md hover:bg-blue-800  dark:bg-blue-500 dark:hover:bg-blue-400'
				hoverable={false}
				type={Link}
				href='/'
			>
				<Text transitioned={false} className='h-full text-white dark:text-text-dark font-extrabold dark:font-bold p-0'>
					Go To Home
				</Text>
			</Button>
		</section>
	)
}

export default NotFound
