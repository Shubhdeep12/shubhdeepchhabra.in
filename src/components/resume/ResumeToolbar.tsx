'use client';

import { useEffect, useRef, useState } from 'react';
import { FiCheck, FiChevronDown, FiCopy, FiDownload, FiExternalLink, FiFileText, FiTerminal } from 'react-icons/fi';
import { VscJson } from 'react-icons/vsc';
import { RESUME_JSON_PATH, RESUME_MD_PATH, RESUME_PDF_PATH, SITE_URL } from '@/src/utils/resume';

const CURL = `curl -H "Accept: text/markdown" ${SITE_URL.replace('https://', '')}/resume`;

type Copied = 'markdown' | 'curl' | null;

export default function ResumeToolbar({ markdown }: { markdown: string }) {
	const [open, setOpen] = useState(false);
	const [copied, setCopied] = useState<Copied>(null);
	const rootRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!open) return;
		const onPointer = (e: PointerEvent) => {
			if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setOpen(false);
				triggerRef.current?.focus();
			}
		};
		document.addEventListener('pointerdown', onPointer);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('pointerdown', onPointer);
			document.removeEventListener('keydown', onKey);
		};
	}, [open]);

	const copy = async (text: string, what: Exclude<Copied, null>) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(what);
			window.setTimeout(() => setCopied(null), 1600);
		} catch {
			setCopied(null);
		}
	};

	return (
		<div className='resume-toolbar' ref={rootRef}>
			<a className='resume-btn resume-btn--primary' href={RESUME_PDF_PATH} download>
				<FiDownload aria-hidden='true' />
				Download PDF
			</a>
			<a className='resume-btn' href={RESUME_PDF_PATH} target='_blank' rel='noreferrer'>
				<FiExternalLink aria-hidden='true' />
				View PDF
			</a>
			<div className='resume-menu'>
				<button
					ref={triggerRef}
					type='button'
					className='resume-btn'
					aria-haspopup='menu'
					aria-expanded={open}
					onClick={() => setOpen((v) => !v)}
				>
					More formats
					<FiChevronDown aria-hidden='true' className='resume-btn-chevron' />
				</button>
				{open ? (
					<div className='resume-menu-panel' role='menu'>
						<button
							type='button'
							role='menuitem'
							className='resume-menu-item'
							onClick={() => copy(markdown, 'markdown')}
						>
							{copied === 'markdown' ? <FiCheck aria-hidden='true' /> : <FiCopy aria-hidden='true' />}
							<span>Copy as Markdown</span>
							<span className='resume-menu-hint'>{copied === 'markdown' ? 'Copied' : 'for LLMs'}</span>
						</button>
						<a role='menuitem' className='resume-menu-item' href={RESUME_MD_PATH} target='_blank' rel='noreferrer'>
							<FiFileText aria-hidden='true' />
							<span>Markdown</span>
							<span className='resume-menu-hint'>.md</span>
						</a>
						<a role='menuitem' className='resume-menu-item' href={RESUME_JSON_PATH} target='_blank' rel='noreferrer'>
							<VscJson aria-hidden='true' />
							<span>JSON Resume</span>
							<span className='resume-menu-hint'>.json</span>
						</a>
						<button
							type='button'
							role='menuitem'
							className='resume-menu-item resume-menu-item--code'
							onClick={() => copy(CURL, 'curl')}
							title='Copy command'
						>
							{copied === 'curl' ? <FiCheck aria-hidden='true' /> : <FiTerminal aria-hidden='true' />}
							<code>{CURL}</code>
						</button>
					</div>
				) : null}
			</div>
		</div>
	);
}
