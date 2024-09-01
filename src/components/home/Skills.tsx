'use client';

import Skills from '../Skills';
import Text from '@/src/ui/Text';

const SkillsPills = () => {
	return (
		<section id='skill-pills' className='flex flex-col gap-4 items-start'>
			<Text
				variant='shadow'
				gFrom='dark:from-cyan-500'
				gTo='dark:to-sky-500'
				shadowColor='blue'
				className='font-bold text-2xl text-heading-dark'
				as={'h2'}
			>
				Skills
			</Text>
			<Skills />
		</section>
	);
};

export default SkillsPills;
