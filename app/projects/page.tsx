import { Metadata } from 'next';
import AllProjects from '@/src/components/AllProjects';
import AnimatePage from '@/src/components/AnimatePage';

export const metadata: Metadata = {
	title: 'Projects - Shubhdeep Chhabra',
	description: 'List of projects made by Shubhdeep',
};

export default function Projects() {
	return (
		<AnimatePage>
			<AllProjects />
		</AnimatePage>
	);
}
