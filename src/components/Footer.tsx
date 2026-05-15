'use client';
import Link from 'next/link';
import { FOOTER_NAVBAR_ITEMS } from '@/src/utils/constants';
import SocialButtons from './SocialButtons';

const Footer = () => {
	return (
		<footer className='site-footer site-footer-container w-full'>
			<Link href='/' className='footer-copyright'>
				<span className='footer-copyright-name'>Shubhdeep</span>
			</Link>
			<div className='footer-right'>
				<nav className='footer-nav'>
					{FOOTER_NAVBAR_ITEMS.map((item: any) => (
						<Link key={item.key} href={item.route} target={item.target} className='footer-nav-link'>
							{item.title}
						</Link>
					))}
				</nav>
				<div className='footer-divider' />
				<SocialButtons mode='footer' />
			</div>
		</footer>
	);
};
export default Footer;
