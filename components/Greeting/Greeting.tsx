'use client'
import { useState, useEffect } from 'react'
import Text from '../Text'

const greetings = ['Hello, world', 'हैलो, वर्ल्ड']

const Greeting = () => {
	const [hello, setHello] = useState(0)
	useEffect(() => {
		const changeHello = setInterval(() => {
			setHello((helloo) => (helloo >= greetings.length - 1 ? 0 : helloo + 1))
		}, 2500)
		return () => clearInterval(changeHello)
	}, [])

	return (
		<div className='flex flex-col gap-2'>
			<div className='flex gap-1 items-center text-3xl'>
				<span className='inline-block motion-safe:animate-wave'>👋</span>
				<Text
					variant='shadow'
					shadowColor='yellow'
					className='font-semibold text-heading-dark dark:text-heading-light leading-relaxed'
				>
					{greetings[hello]}!
				</Text>
			</div>
			<div className='flex gap-1 items-center text-3xl w-fit'>
				<Text
					variant='shadow'
					shadowColor='blue'
					className='font-semibold text-3xl text-heading-dark dark:text-heading-light'
				>
					{`I'm`}
				</Text>
				&nbsp;
				<Text
					variant='shadow'
					gFrom='dark:from-sky-500'
					gTo='dark:to-blue-500'
					shadowColor='blue'
					className='font-semibold text-3xl text-heading-dark dark:text-heading-light'
				>
					Shubhdeep Chhabra
				</Text>
			</div>
		</div>
	)
}

export default Greeting
