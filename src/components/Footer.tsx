'use client';
import Text from '@/src/ui/Text';
import Button from '@/src/ui/Button';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import SocialButtons from './SocialButtons';
import { SCIcon } from '@/src/Icons';
import Image from 'next/image';
import { DONATE_SOURCES, FOOTER_NAVBAR_ITEMS, SOURCE_FOOTER_ITEMS } from '@/src/utils/constants';
import Link from 'next/link';
import { useUIStore } from '@/src/stores/ui-store';

const Footer = () => {
	const router = useRouter();
	const { currentFocusedItem, setCurrentFocusedItem } = useUIStore();

	return (
		<footer
			className='
				w-full max-w-laptop mx-auto
				flex flex-col gap-9 py-9 px-2 border-t bottom-0'
		>
			<div className='flex gap-9'>
				<ul className='flex flex-col min-w-[100px] laptop:min-w-[140px] gap-4 items-start'>
					{FOOTER_NAVBAR_ITEMS.map((item: any) => (
						<li key={item.key} onFocus={() => setCurrentFocusedItem(item.key)} onBlur={() => setCurrentFocusedItem('')}>
							<Button
								focusOutlined
								hoverable={false}
								className={clsx(
									'duration-0 rounded-sm hocus:underline	hocus:underline-offset-2 hocus:decoration-2	hocus:text-transparent',
									item.underline
								)}
								type={Link}
								href={item.route}
								target={item.target}
							>
								<Text
									variant='gradient'
									active={currentFocusedItem === item.key}
									gFrom={item.gFrom}
									gTo={item.gTo}
									className={clsx('hover:text-transparent font-semibold')}
								>
									{item.title}
								</Text>
							</Button>
						</li>
					))}
				</ul>
				<ul className='flex flex-col min-w-[100px] laptop:min-w-[140px] gap-4 items-start'>
					{SOURCE_FOOTER_ITEMS.map((item: any) => (
						<li key={item.key} onFocus={() => setCurrentFocusedItem(item.key)} onBlur={() => setCurrentFocusedItem('')}>
							<Button
								focusOutlined
								hoverable={false}
								className={clsx(
									'duration-0 rounded-sm hocus:underline	hocus:underline-offset-2 hocus:decoration-2	hocus:text-transparent',
									item.underline
								)}
								type={Link}
								href={item.route}
								target={item.target}
							>
								<Text
									variant='gradient'
									active={currentFocusedItem === item.key}
									gFrom={item.gFrom}
									gTo={item.gTo}
									className={clsx('hover:text-transparent font-semibold')}
								>
									{item.title}
								</Text>
							</Button>
						</li>
					))}
				</ul>
				<ul className='flex flex-col min-w-[100px] laptop:min-w-[140px] gap-4 items-start'>
					{DONATE_SOURCES.map((item: any) => (
						<li key={item.key} onFocus={() => setCurrentFocusedItem(item.key)} onBlur={() => setCurrentFocusedItem('')}>
							<Button
								focusOutlined
								hoverable={false}
								className={clsx(
									'duration-0 rounded-sm hocus:underline	hocus:underline-offset-2 hocus:decoration-2	hocus:text-transparent',
									item.underline
								)}
								type={Link}
								href={item.route}
								target={item.target}
							>
								<Text
									variant='gradient'
									active={currentFocusedItem === item.key}
									gFrom={item.gFrom}
									gTo={item.gTo}
									className={clsx('hover:text-transparent font-semibold')}
								>
									{item.title}
								</Text>
							</Button>
						</li>
					))}
				</ul>
			</div>

			<div className='flex justify-between'>
				<Button
					focusOutlined
					hoverable={false}
					className='group rounded-sm hocus:underline	hocus:underline-offset-2 hocus:decoration-2 flex items-center'
					onClick={() => router.push('/')}
				>
					<span className='block relative min-w-[32px] w-[32px] h-[32px] [&>*]:absolute [&>*]:top-1/2 [&>*]:left-0 [&>*]:transform [&>*]:-translate-y-1/2 [&>*]:transition'>
						<SCIcon
							width={24}
							height={24}
							className='
							opacity-100 scale-100 visible
							group-hocus:opacity-0 group-hocus:scale-0 group-hocus:invisible
							transform transition
							'
						/>
						<Image
							src='/assets/shubh-avatar-1.png'
							height={24}
							width={24}
							alt='shubh-avatar'
							className='
							group-hocus:opacity-100 group-hocus:scale-100 group-hocus:visible
							opacity-0 scale-0 invisible
							transform transition
							'
						/>
					</span>
					<Text className={clsx('font-semibold')}>Shubhdeep</Text>
				</Button>

				<SocialButtons backToTop />
			</div>
		</footer>
	);
};
export default Footer;
