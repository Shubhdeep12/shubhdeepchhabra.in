import { type PropsWithChildren } from 'react';
import PostReadingRail from '@/src/components/editorial/PostReadingRail';
import PostToolsRail from '@/src/components/editorial/PostToolsRail';

type PostReadingLayoutProps = PropsWithChildren<{
	mdxMarkdown: string;
	githubEditUrl?: string | null;
	shareTitle?: string | null;
	shareUrl?: string | null;
}>;

export default function PostReadingLayout({
	children,
	mdxMarkdown,
	githubEditUrl,
	shareTitle,
	shareUrl,
}: PostReadingLayoutProps) {
	return (
		<div className='post-reading-layout'>
			<PostToolsRail
				mdxMarkdown={mdxMarkdown}
				githubEditUrl={githubEditUrl ?? undefined}
				shareTitle={shareTitle ?? undefined}
				shareUrl={shareUrl ?? undefined}
			/>
			<div className='post-reading-main'>{children}</div>
			<PostReadingRail mdxMarkdown={mdxMarkdown} />
		</div>
	);
}
