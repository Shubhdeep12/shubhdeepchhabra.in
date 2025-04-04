'use client';

import { useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { useThemeStore } from '@/src/stores/theme-store';
import { useUIStore } from '@/src/stores/ui-store';
import Button from '@/src/ui/Button';
import Text from '@/src/ui/Text';
import { useIsMounted } from '@/src/hooks/isMounted';
import Image from 'next/image';
import { BentoGridIcon, SCIcon } from '@/src/Icons';
import Link from 'next/link';
import Loader from './Loader';
import { NAVIGATIONBAR_ITEMS } from '@/src/utils/constants';
import { useTheme } from 'next-themes';

const Navbar = () => {
	const pathname = usePathname();
	const isMounted = useIsMounted();
	const { isNavbarExpanded, setNavbarExpanded, isBentoLayout, setBentoLayout } = useUIStore();
	const { isDark, toggleTheme } = useThemeStore();
	const { setTheme } = useTheme();
	const menuButtonRef = useRef<HTMLButtonElement>(null);
	const navRef = useRef<HTMLElement>(null);
	const menuItemsRef = useRef<HTMLButtonElement[]>([]);

	const NAVBAR_ITEMS = [
		{
			...NAVIGATIONBAR_ITEMS.about,
			active: pathname?.startsWith('/about'),
		},
		{
			...NAVIGATIONBAR_ITEMS.projects,
			active: pathname?.startsWith('/projects'),
		},
		{
			...NAVIGATIONBAR_ITEMS.blog,
			active: pathname?.startsWith('/blog'),
		},
	];

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!isNavbarExpanded) return;

			switch (e.key) {
				case 'Escape':
					setNavbarExpanded(false);
					menuButtonRef.current?.focus();
					break;
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isNavbarExpanded, setNavbarExpanded]);

	const handleThemeToggle = () => {
		const newTheme = isDark ? 'light' : 'dark';
		setTheme(newTheme);
		toggleTheme();
	};

	const NavList = ({ className }: { className: string }) => (
		<ul className={className} role='menubar' aria-label='Main navigation'>
			{NAVBAR_ITEMS.map((item, index) => (
				<li key={item.key} role='none'>
					<Button
						ref={(el: HTMLButtonElement | null) => {
							if (el) menuItemsRef.current[index] = el;
						}}
						type={Link}
						onClick={() => setNavbarExpanded(false)}
						href={item.route}
						height='h-full'
						width='w-full'
						variant='normal'
						focusOutlined
						className='rounded flex justify-center'
						active={item.active}
						role='menuitem'
						aria-current={item.active ? 'page' : undefined}
					>
						<Text
							className='font-semibold text-base p-2'
							gFrom={item.gFrom}
							gTo={item.gTo}
							variant='gradient'
							active={item.active}
							hoverable
						>
							{item.title}
						</Text>
					</Button>
				</li>
			))}
		</ul>
	);

	return (
		<nav
			ref={navRef}
			className={clsx(
				'fixed top-2 left-1/2 laptop:top-3 laptop:max-w-laptop w-full mx-auto -translate-x-1/2',
				'flex flex-col',
				'transition-all',
				'rounded-lg',
				'p-[10px]',
				'bg-background-nav-light dark:bg-background-nav-dark backdrop-blur-[10px] backdrop-saturate-150',
				'hover:shadow-dark',
				'border border-border-nav-dark dark:border-border-nav-light',
				'z-10'
			)}
			role='navigation'
			aria-label='Main navigation'
		>
			<section className='h-[40px] flex gap-4 justify-between items-center'>
				<div className='h-full'>
					<Button
						type={Link}
						href='/'
						height='h-full'
						variant='normal'
						focusOutlined
						className='group rounded overflow-hidden flex items-center'
						aria-label='Home'
					>
						<span className='block relative min-w-[32px] w-[32px] h-[32px] [&>*]:absolute [&>*]:top-1/2 [&>*]:left-0 [&>*]:transform [&>*]:-translate-y-1/2 [&>*]:transition'>
							<SCIcon
								width={32}
								height={32}
								className='
                opacity-100 scale-100 visible
                group-hocus:opacity-0 group-hocus:scale-0 group-hocus:invisible
                transform transition
                '
								aria-hidden='true'
							/>
							<Image
								src='/assets/shubh-avatar-1.png'
								height={32}
								width={32}
								alt='Shubhdeep Chhabra'
								className='
                group-hocus:opacity-100 group-hocus:scale-100 group-hocus:visible group-hocus:block
                opacity-0 scale-0 invisible
                transform transition
                '
							/>
						</span>
						<Text className='font-extrabold text-xl py-2 px-1'>Shubhdeep</Text>
					</Button>
				</div>

				<section className='flex grow justify-end h-full'>
					<NavList className={'hidden laptop:flex gap-6'} />
				</section>

				<div className='h-full w-[42px] flex items-center justify-center'>
					<Button
						height='h-full'
						width='w-full'
						variant='normal'
						focusOutlined
						className='rounded flex justify-center items-center'
						onClick={() => setBentoLayout(!isBentoLayout)}
						aria-label={`Switch to ${isBentoLayout ? 'normal' : 'bento'} layout`}
					>
						<BentoGridIcon width={20} height={20} aria-hidden='true' />
					</Button>
				</div>

				<div className='h-full w-[42px] flex items-center justify-center'>
					{isMounted ? (
						<Button
							height='h-full'
							width='w-full'
							variant='normal'
							focusOutlined
							className='rounded flex justify-center items-center'
							onClick={handleThemeToggle}
							aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
						>
							{isDark ? <IoSunny size={20} aria-hidden='true' /> : <IoMoon size={20} aria-hidden='true' />}
						</Button>
					) : (
						<Loader />
					)}
				</div>

				<div className='laptop:hidden h-full w-[42px]'>
					<Button
						ref={menuButtonRef}
						height='h-full'
						width='w-full'
						variant='normal'
						focusOutlined
						className='rounded flex justify-center items-center'
						onClick={() => setNavbarExpanded(!isNavbarExpanded)}
						aria-expanded={isNavbarExpanded}
						aria-controls='mobile-menu'
						aria-label={isNavbarExpanded ? 'Close menu' : 'Open menu'}
					>
						<div className={`transition-all ${isNavbarExpanded ? 'rotate-45' : '-rotate-45'}`}>
							{isNavbarExpanded ? (
								<RxCross2 className='-rotate-45' size={20} aria-hidden='true' />
							) : (
								<RxHamburgerMenu size={20} className='rotate-45' aria-hidden='true' />
							)}
						</div>
					</Button>
				</div>
			</section>

			<section
				id='mobile-menu'
				className={`${
					isNavbarExpanded ? 'h-[calc(100vh-75px)]' : 'h-0'
				} transition-all w-full flex items-center laptop:hidden`}
				aria-hidden={!isNavbarExpanded}
			>
				<NavList
					className={isNavbarExpanded ? 'laptop:hidden flex align-middle w-full h-[42px] flex-col gap-6' : 'hidden'}
				/>
			</section>
		</nav>
	);
};

export default Navbar;
