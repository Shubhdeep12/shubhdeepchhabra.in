'use client'

import { useTheme } from '@/providers/theme-provider'
import Skills from '../Skills'
import Text from '../Text'

const SkillsPills = () => {
	const { isDark } = useTheme()
	return (
		<section id='skill-pills' className='flex flex-col gap-4 items-start'>
			<Text
				shadow={!isDark}
				shadowColor='blue'
				gradient={isDark}
				active={isDark}
				className='font-bold text-2xl text-heading-dark'
			>
				Skills
			</Text>
			<Skills />
		</section>
	)
}

export default SkillsPills
