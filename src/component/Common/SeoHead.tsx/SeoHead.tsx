// components/SeoHead.tsx
import Head from 'next/head';

interface SeoHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const SeoHead = ({
  title = '콩글리시',
  description = '콩들과 함께하는 즐거운 단어 암기',
  image = 'https://www.konglish.shop/images/konglish.webp',
  url = 'https://www.konglish.shop',
}: SeoHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="영어, 단어장, 단어 학습, 콩글리시, 영어공부, 단어 외우기" />
      <meta name="author" content="콩글리시 팀" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="콩글리시" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

export default SeoHead;
