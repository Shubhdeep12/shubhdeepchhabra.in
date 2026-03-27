type MetaRowProps = {
	date: string;
	readingTime: string;
	views?: number;
};

export default function MetaRow({ date, readingTime, views }: MetaRowProps) {
	return (
		<p className='text-meta text-text-muted'>
			{date} · {readingTime}
			{typeof views === 'number' ? ` · ${views} views` : ''}
		</p>
	);
}
