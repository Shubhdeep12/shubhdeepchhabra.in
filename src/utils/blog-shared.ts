import { Blog, FrontMatter } from './types';

const LEGACY_COLOR_CATEGORY_MAP: Record<string, string> = {
	blue: 'Frontend',
	cyan: 'Backend',
	indigo: 'Engineering',
	purple: 'Tooling',
	orange: 'Tutorial',
	pink: 'SEO',
};

const normalize = (value: string) => value.trim();

export const getCategories = (frontMatter: FrontMatter) => {
	if (Array.isArray(frontMatter.categories) && frontMatter.categories.length > 0) {
		return [...new Set(frontMatter.categories.map(normalize).filter(Boolean))];
	}

	if (typeof frontMatter.category === 'string' && frontMatter.category.trim()) {
		return [normalize(frontMatter.category)];
	}

	if (frontMatter.color && LEGACY_COLOR_CATEGORY_MAP[frontMatter.color]) {
		return [LEGACY_COLOR_CATEGORY_MAP[frontMatter.color]];
	}

	return ['Writing'];
};

export const getPrimaryCategory = (frontMatter: FrontMatter) => {
	const categories = getCategories(frontMatter);
	return categories[0] || 'Writing';
};

export const sortBlogsByDate = (blogs: Blog[]) =>
	[...blogs].sort((a, b) => Number(new Date(b.frontMatter.publishedAt)) - Number(new Date(a.frontMatter.publishedAt)));
