'use client';
import { BackToTopIcon } from '@/src/Icons';
import Button from '@/src/ui/Button';
import { scrollToTop } from './BackToTop';

const BackToTopButton = () => {
	return (
		<Button
			height='h-[30px]'
			width='w-[30px]'
			focusOutlined
			className='group rounded flex items-center justify-center'
			onClick={() => scrollToTop()}
			aria-label='Scroll to top'
		>
			<BackToTopIcon
				width={22}
				height={22}
				color='#5f5f5f'
				className='group-hocus:fill-black dark:group-hocus:fill-zinc-200 dark:fill-zinc-400'
				aria-hidden='true'
			/>
		</Button>
	);
};

export default BackToTopButton;
