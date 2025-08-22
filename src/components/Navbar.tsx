'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';
import { IoMoon, IoSunny } from 'react-icons/io5';

import { useTheme } from '@/src/providers/theme-provider';

import Button from '@/src/ui/Button';
import Text from '@/src/ui/Text';
import { useIsMounted } from '@/src/hooks/isMounted';
import Image from 'next/image';
import { SCIcon } from '@/src/Icons';
import Link from 'next/link';
import Loader from './Loader';
import { NAVIGATIONBAR_ITEMS } from '@/src/utils/constants';

import * as Sentry from '@sentry/nextjs';

const Navbar = () => {
	const { logger } = Sentry;
	const pathname = usePathname();
	const isMounted = useIsMounted();
	const [navbarExpanded, setNavbarExpanded] = useState(false);
	const { isDark, toggleTheme } = useTheme();

	logger.error(logger.fmt`Uh on, something broke, here's the error: `);
	logger.trace('Starting database connection', { database: 'users' });
	logger.debug('Cache miss for user', { userId: 123 });
	logger.info('Updated profile', { profileId: 345 });
	logger.warn('Rate limit reached for endpoint', {
		endpoint: '/api/results/',
		isEnterprise: false,
	});
	logger.error('Failed to process payment', {
		orderId: 'order_123',
		amount: 99.99,
	});
	logger.fatal('Database connection pool exhausted', {
		database: 'users',
		activeConnections: 100,
	});
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

	const NavList = ({ className }: { className: string }) => (
		<ul className={className}>
			{NAVBAR_ITEMS.map((item) => (
				<li key={item.key}>
					<Button
						type={Link}
						onClick={() => setNavbarExpanded(false)}
						href={item.route}
						height='h-full'
						width='w-full'
						variant='normal'
						focusOutlined
						className='rounded flex justify-center'
						active={item.active}
					>
						<div hidden></div>
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

	function foo() {
		const rejections = [new Error('Message 1'), new Error('Message 2'), new Error('Message 3')];
		throw new AggregateError(rejections, 'wat');
	}

	return (
		<nav
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
							/>
							<Image
								src='/assets/shubh-avatar-1.png'
								height={32}
								width={32}
								alt='shubh-avatar'
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

				<Button
					onClick={() => {
						// try {
						// 	throw new Error('aaa')
						// } catch (error) {
						// 	// Sentry.addBreadcrumb({
						// 	// 	category: "auth",
						// 	// 	message: "Authenticated user ",
						// 	// 	level: "info",
						// 	// });
						// 	// Sentry.captureException(error)

						// 	// 				Sentry.captureEvent({
						// 	//   event_id: 'aa3ff046696b4bc6b609ce6d28fde9e2',
						// 	//   message: 'someMessage',
						// 	//   transaction: 'wat',
						// 	//   type: 'replay_event',
						// 	// });
						// 	// Sentry.captureUserFeedback({
						// 	// 	event_id: 'test_event_id',
						// 	// 	email: 'test_email',
						// 	// 	comments: 'test_comments',
						// 	// 	name: 'test_name',
						// 	// });
						// 	// Sentry.captureMessage('hitting API navbar')
						// 	// await fetch(`/api/reactions/connect-mongodb-with-nodejs`, {
						// 	// 	method: 'POST',
						// 	// 	body: JSON.stringify({ type: 'like' }),
						// 	// 	headers: { 'Content-Type': 'application/json' },
						// 	// })
						// }

						Sentry.setTag('aaa', 'aaaaaa');

						try {
							foo();
						} catch (e) {
							Sentry.captureException(e);
						}
					}}
				>
					Throw
				</Button>

				<Button
					onClick={() => {
						logger.error(logger.fmt`Uh on, something broke, here's the error: `);
						logger.trace('Starting database connection', { database: 'users' });
						logger.debug('Cache miss for user', { userId: 123 });
						logger.info('Updated profile', { profileId: 345 });
						logger.warn('Rate limit reached for endpoint', {
							endpoint: '/api/results/',
							isEnterprise: false,
						});
						logger.error('Failed to process payment', {
							orderId: 'order_123',
							amount: 99.99,
						});
						logger.fatal('Database connection pool exhausted', {
							database: 'users',
							activeConnections: 100,
						});
						console.log('logsssss');
					}}
				>
					Logs
				</Button>
				<div className='h-full w-[42px] flex items-center justify-center'>
					{isMounted ? (
						<Button
							height='h-full'
							width='w-full'
							variant='normal'
							focusOutlined
							className='rounded flex justify-center items-center'
							onClick={toggleTheme}
						>
							{isDark ? <IoSunny size={20} /> : <IoMoon size={20} />}
						</Button>
					) : (
						<Loader />
					)}
				</div>

				<div className='laptop:hidden h-full w-[42px]'>
					<Button
						height='h-full'
						width='w-full'
						variant='normal'
						focusOutlined
						className='rounded flex justify-center items-center'
						onClick={() => setNavbarExpanded(!navbarExpanded)}
					>
						<div className={`transition-all ${navbarExpanded ? 'rotate-45' : '-rotate-45'}`}>
							{navbarExpanded ? (
								<RxCross2 className='-rotate-45' size={20} />
							) : (
								<RxHamburgerMenu size={20} className='rotate-45' />
							)}
						</div>
					</Button>
				</div>
			</section>

			<section
				className={`${
					navbarExpanded ? 'h-[calc(100vh-75px)]' : 'h-0'
				} transition-all w-full flex items-center laptop:hidden`}
			>
				<NavList
					className={navbarExpanded ? 'laptop:hidden flex align-middle w-full h-[42px] flex-col gap-6' : 'hidden'}
				/>
			</section>
		</nav>
	);
};

export default Navbar;
