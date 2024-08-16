import readingTime from 'reading-time';

export type SkillProp = {
	id: string;
	title: string;
	bgColor: string;
	borderColor: string;
	wIcon: number;
	hIcon: number;
	position?: string;
};

export type SocialProps = {
	key: string;
	icon: string;
	className: string;
	action?: string;
};

export type IconProps = {
	width?: number;
	height?: number;
	color?: string;
	className?: string;
	filled?: boolean;
};

export type ProjectProps = {
	key: string;
	title: string;
	description?: string;
	stack?: string[];
	bgColor: string;
	metaDataStyles?: string;
	imageStyles?: string;
	titleStyles?: string;
	href: string;
	featured: boolean;
	src: string | React.ElementType;
};

export interface FrontMatter {
	title: string;
	publishedAt: string;
	description: string;
	cover: string;
	color: string;
}

export interface Blog {
	slug: string;
	frontMatter: FrontMatter;
	readingTime: ReturnType<typeof readingTime>;
	mdxSource: any;
}
