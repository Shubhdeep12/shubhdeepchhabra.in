import AllProjects from '@/src/components/AllProjects';
import AnimatePage from '@/src/components/AnimatePage';
import { Metadata } from 'next';

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
