import AllProjects from '@/src/components/shared/projects/AllProjects';
import AnimatePage from '@/src/components/shared/animations/AnimatePage';
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
