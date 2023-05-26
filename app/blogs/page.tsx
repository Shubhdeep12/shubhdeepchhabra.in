'use client'
import React from 'react'

export default function Blogs() {
	return (
		<div className='h-[1700px] flex gap-6 w-full flex-col'>
			{Array.from(Array(1000).keys()).map((i) => (
				<div key={i}>Blogs</div>
			))}
		</div>
	)
}
