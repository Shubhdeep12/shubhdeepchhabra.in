'use client'

import Skills from '../Skills'
import Text from '../Text'

const SkillsPills = () => {
	return (
		<section id='skill-pills' className='flex flex-col gap-4 items-start'>
			<Text shadow shadowColor='blue' className='font-bold text-2xl text-heading-dark'>
				Skills
			</Text>
			<Skills />
		</section>
	)
}

export default SkillsPills
