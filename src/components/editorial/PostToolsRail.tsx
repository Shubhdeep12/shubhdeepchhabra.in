'use client';

import { useEffect, useRef, useState } from 'react';
import { FiCheck, FiCopy, FiGithub, FiShare2 } from 'react-icons/fi';

function GlowIconButton({
	children,
	onClick,
	href,
	title,
	ariaExpanded,
	ariaHasPopup,
	buttonRef,
	isActive,
}: {
	children: React.ReactNode;
	onClick?: () => void;
	href?: string;
	title: string;
	ariaExpanded?: boolean;
	ariaHasPopup?: boolean;
	buttonRef?: React.Ref<HTMLButtonElement>;
	isActive?: boolean;
}) {
	const glowRef = useRef<HTMLSpanElement>(null);

	const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
		const el = glowRef.current;
		if (!el) return;
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
		el.style.setProperty('--my', `${e.clientY - rect.top}px`);
	};

	const className = `post-rail-icon-btn ${isActive ? 'post-rail-icon-btn--active' : ''}`;

	if (href) {
		return (
			<a className={className} href={href} target='_blank' rel='noreferrer' title={title} onMouseMove={handleMouseMove}>
				<span ref={glowRef} className='post-rail-icon-glow' aria-hidden='true' />
				{children}
			</a>
		);
	}

	return (
		<button
			ref={buttonRef}
			type='button'
			className={className}
			onClick={onClick}
			title={title}
			aria-expanded={ariaExpanded}
			aria-haspopup={ariaHasPopup}
			onMouseMove={handleMouseMove}
		>
			<span ref={glowRef} className='post-rail-icon-glow' aria-hidden='true' />
			{children}
		</button>
	);
}

type PostToolsRailProps = {
	mdxMarkdown: string;
	githubEditUrl?: string;
	shareTitle?: string;
	shareUrl?: string;
};

export default function PostToolsRail({ mdxMarkdown, githubEditUrl, shareTitle, shareUrl }: PostToolsRailProps) {
	const [menuOpen, setMenuOpen] = useState(false);
	const [copyLabel, setCopyLabel] = useState('');
	const [tooltip, setTooltip] = useState<string | null>(null);
	const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
	const menuRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!menuOpen) return;
		const onDoc = (e: MouseEvent) => {
			const t = e.target as Node;
			if (menuRef.current?.contains(t) || triggerRef.current?.contains(t)) return;
			setMenuOpen(false);
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setMenuOpen(false);
		};
		document.addEventListener('mousedown', onDoc);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('mousedown', onDoc);
			document.removeEventListener('keydown', onKey);
		};
	}, [menuOpen]);

	const flash = (label: string) => {
		setCopyLabel(label);
		window.setTimeout(() => setCopyLabel(''), 2000);
	};

	const copyPlain = async () => {
		const article = document.querySelector<HTMLElement>('#post-content');
		if (!article) return;
		const text = article.innerText.replace(/\n{3,}/g, '\n\n').trim();
		try {
			await navigator.clipboard.writeText(text);
			flash('Plain text copied');
		} catch {
			flash('Copy failed');
		}
		setMenuOpen(false);
	};

	const copyMd = async () => {
		try {
			await navigator.clipboard.writeText(mdxMarkdown.trim());
			flash('Markdown copied');
		} catch {
			flash('Copy failed');
		}
		setMenuOpen(false);
	};

	const handleShare = async () => {
		if (!shareTitle || !shareUrl) return;
		try {
			if (navigator.share) {
				await navigator.share({ title: shareTitle, text: shareTitle, url: shareUrl });
				flash('Shared');
			} else {
				await navigator.clipboard.writeText(shareUrl);
				flash('Link copied');
			}
		} catch (e) {
			if ((e as Error)?.name === 'AbortError') return;
			try {
				await navigator.clipboard.writeText(shareUrl);
				flash('Link copied');
			} catch {
				window.open(shareUrl, '_blank', 'noopener,noreferrer');
			}
		}
	};

	const showTooltip = (text: string) => (e: React.MouseEvent<HTMLElement>) => {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		setTooltip(text);
		setTooltipPos({
			x: rect.left + rect.width / 2,
			y: rect.bottom + 8,
		});
	};

	const hideTooltip = () => setTooltip(null);

	return (
		<aside className='post-tools-rail' aria-label='Article tools'>
			<div className='post-rail-section'>
				<p className='post-rail-heading'>Actions</p>
				<div className='post-rail-actions'>
					{githubEditUrl ? (
						<span onMouseEnter={showTooltip('Edit on GitHub')} onMouseLeave={hideTooltip}>
							<GlowIconButton href={githubEditUrl} title='Edit on GitHub'>
								<FiGithub className='post-rail-icon' aria-hidden />
							</GlowIconButton>
						</span>
					) : null}
					{shareUrl && shareTitle ? (
						<span onMouseEnter={showTooltip('Share article')} onMouseLeave={hideTooltip}>
							<GlowIconButton onClick={() => void handleShare()} title='Share article'>
								<FiShare2 className='post-rail-icon' aria-hidden />
							</GlowIconButton>
						</span>
					) : null}
					<div className='post-rail-copy'>
						<GlowIconButton
							buttonRef={triggerRef}
							onClick={() => setMenuOpen((o) => !o)}
							title='Copy article'
							ariaExpanded={menuOpen}
							ariaHasPopup
							isActive={menuOpen}
						>
							{copyLabel ? (
								<FiCheck className='post-rail-icon' aria-hidden />
							) : (
								<FiCopy className='post-rail-icon' aria-hidden />
							)}
						</GlowIconButton>
						{menuOpen ? (
							<div ref={menuRef} className='post-rail-copy-menu' role='menu'>
								<button type='button' className='post-rail-copy-item' role='menuitem' onClick={() => void copyPlain()}>
									Plain text
								</button>
								<button type='button' className='post-rail-copy-item' role='menuitem' onClick={() => void copyMd()}>
									Markdown
								</button>
							</div>
						) : null}
					</div>
				</div>
			</div>
			{tooltip ? (
				<div className='post-rail-tooltip' style={{ left: tooltipPos.x, top: tooltipPos.y }} role='tooltip'>
					{tooltip}
				</div>
			) : null}
		</aside>
	);
}
