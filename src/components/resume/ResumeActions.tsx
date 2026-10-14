'use client';

import { useState } from 'react';
import { FiCheck, FiCopy, FiDownload, FiFileText, FiPrinter } from 'react-icons/fi';
import { VscJson } from 'react-icons/vsc';
import { RESUME_JSON_PATH, RESUME_MD_PATH, RESUME_PDF_PATH } from '@/src/utils/resume';

export default function ResumeActions({ markdown }: { markdown: string }) {
	const [copied, setCopied] = useState<'ok' | 'failed' | null>(null);

	const copyMarkdown = async () => {
		try {
			await navigator.clipboard.writeText(markdown);
			setCopied('ok');
		} catch {
			setCopied('failed');
		}
		window.setTimeout(() => setCopied(null), 2000);
	};

	return (
		<div className='resume-actions' role='toolbar' aria-label='Resume formats'>
			<a className='resume-action resume-action--primary' href={RESUME_PDF_PATH} download>
				<FiDownload aria-hidden='true' />
				PDF
			</a>
			<a className='resume-action' href={RESUME_MD_PATH} target='_blank' rel='noreferrer' type='text/markdown'>
				<FiFileText aria-hidden='true' />
				Markdown
			</a>
			<a className='resume-action' href={RESUME_JSON_PATH} target='_blank' rel='noreferrer' type='application/json'>
				<VscJson aria-hidden='true' />
				JSON
			</a>
			<button type='button' className='resume-action' onClick={copyMarkdown} aria-live='polite'>
				{copied === 'ok' ? <FiCheck aria-hidden='true' /> : <FiCopy aria-hidden='true' />}
				{copied === 'ok' ? 'Copied' : copied === 'failed' ? 'Copy failed' : 'Copy for LLMs'}
			</button>
			<button type='button' className='resume-action' onClick={() => window.print()}>
				<FiPrinter aria-hidden='true' />
				Print
			</button>
		</div>
	);
}
