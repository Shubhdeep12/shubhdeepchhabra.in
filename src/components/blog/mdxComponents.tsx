import BlogImages from '@/src/components/blog/BlogImages';
import BlogTable from '@/src/components/blog/BlogTable';

// One place to register what MDX posts can use, shared by /writings/[slug] and /blog/[slug].
const mdxComponents = { Image: BlogImages, table: BlogTable };

export default mdxComponents;
