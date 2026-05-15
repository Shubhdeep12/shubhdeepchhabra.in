import { PropsWithChildren } from 'react';

export default function ReadingContainer({ children }: PropsWithChildren) {
	return <div className='w-full max-w-[780px]'>{children}</div>;
}
