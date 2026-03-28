'use client';

interface ShareButtonProps {
	title: string;
	url: string;
}

export default function ShareButton({ title, url }: ShareButtonProps) {
	const handleShare = async () => {
		if (navigator.share) {
			await navigator.share({ title, text: title, url });
		} else {
			window.open(url, '_blank');
		}
	};

	return (
		<button type='button' className='post-action-link' onClick={handleShare}>
			Share Post →
		</button>
	);
}
