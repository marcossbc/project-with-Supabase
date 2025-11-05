// components/ArticlesList.jsx
import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import ArticleCard from './ArticleCard';

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // helper: compute reading time
  const computeReadingTime = (text) => {
    if (!text) return '1 min';
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min`;
  };

  useEffect(() => {
    let mounted = true;

    const fetchArticles = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('articles')
          .select(`
            id,
            title,
            excerpt,
            slug,
            thumbnail,
            published_at,
            content,
            tags,
            author:author_id(id, username, avatar_url)
          `)
          .order('published_at', { ascending: false })
          .limit(50);

        if (error) throw error;

        const mapped = data.map((item) => {
          // Thumbnail URL if using storage
          let thumbnailUrl = item.thumbnail;
          if (thumbnailUrl && !thumbnailUrl.startsWith('http')) {
            const { data: pu } = supabase.storage.from('thumbnails').getPublicUrl(thumbnailUrl);
            thumbnailUrl = pu.publicUrl;
          }

          const author = item.author?.[0]
            ? { name: item.author[0].username, avatar: item.author[0].avatar_url }
            : { name: 'Author', avatar: null };

          return {
            id: item.id,
            title: item.title,
            excerpt: item.excerpt || item.content?.slice(0, 120),
            slug: item.slug,
            thumbnail: thumbnailUrl,
            author,
            publishedAt: item.published_at,
            readingTime: computeReadingTime(item.content || item.excerpt || ''),
            tags: item.tags || []
          };
        });

        if (mounted) {
          setArticles(mapped);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
        if (mounted) setError(err.message || 'Error loading articles');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchArticles();

    return () => (mounted = false);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-white rounded-lg h-64" />
        ))}
      </div>
    );
  }

  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (articles.length === 0) return <div>No articles found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((a) => (
        <ArticleCard key={a.id} {...a} />
      ))}
    </div>
  );
}
