'use client'
import { BackToTopIcon } from '@/assets/Icons'
import Button from './Button'
import { scrollToTop } from './BackToTop/BackToTop'

const BackToTopButton = () => {
	return (
		<Button
			height='h-[30px]'
			width='w-[30px]'
			focusOutlined
			className='group rounded flex items-center justify-center'
			onClick={() => scrollToTop()}
		>
			<BackToTopIcon
				width={22}
				height={22}
				color='#5f5f5f'
				className='group-hocus:fill-black dark:group-hocus:fill-slate-200 dark:fill-slate-400'
			/>
		</Button>
	)
}

export default BackToTopButton
