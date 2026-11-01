'use client';

import { type ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoClose, IoExpandOutline } from 'react-icons/io5';

const BlogTable = ({ children, ...props }: ComponentPropsWithoutRef<'table'>) => {
	const [expanded, setExpanded] = useState(false);
	const [overflowing, setOverflowing] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const expandButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;
		const check = () => setOverflowing(el.scrollWidth > el.clientWidth + 1);
		check();
		const observer = new ResizeObserver(check);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!expanded) return;

		const trigger = expandButtonRef.current;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		closeButtonRef.current?.focus();

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setExpanded(false);
		};
		window.addEventListener('keydown', onKeyDown);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
			document.body.style.overflow = previousOverflow;
			trigger?.focus();
		};
	}, [expanded]);

	return (
		<div className='post-table'>
			<div className='post-table-bar'>
				{overflowing && <span className='post-table-hint'>Scroll sideways for more →</span>}
				<button
					ref={expandButtonRef}
					type='button'
					className='post-table-expand'
					onClick={() => setExpanded(true)}
					aria-label='Open table in a larger view'
				>
					<IoExpandOutline aria-hidden size={14} />
					Expand
				</button>
			</div>
			<div ref={scrollRef} className='post-table-scroll' role='region' aria-label='Table, scrollable' tabIndex={0}>
				<table {...props}>{children}</table>
			</div>

			{expanded &&
				createPortal(
					<div className='post-table-modal' role='dialog' aria-modal='true' aria-label='Table' onClick={() => setExpanded(false)}>
						<div className='post-table-modal-panel' onClick={(e) => e.stopPropagation()}>
							<div className='post-table-modal-bar'>
								<span className='post-table-modal-hint'>Scroll sideways for more →</span>
								<button
									ref={closeButtonRef}
									type='button'
									className='post-table-modal-close'
									onClick={() => setExpanded(false)}
									aria-label='Close expanded table'
								>
									<IoClose size={20} aria-hidden />
									Close
								</button>
							</div>
							<div className='post-table-modal-scroll' tabIndex={0}>
								<table {...props}>{children}</table>
							</div>
						</div>
					</div>,
					document.body
				)}
		</div>
	);
};

export default BlogTable;
