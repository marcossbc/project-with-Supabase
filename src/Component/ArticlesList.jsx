// components/ArticlesList.jsx
import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase'; // hubi path-ka saxda ah
import ArticleCard from '../Pages/Articales';

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // helper to compute reading time from content text
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
        /**
         * Example select: if you have a foreign key relation to authors table,
         * you can use: .select('id, title, excerpt, slug, thumbnail, published_at, content, tags, author:authors(id, username, avatar_url)')
         * Otherwise adjust to your DB schema.
         */
        const { data, error } = await supabase
          .from('articles')
          .select(`id, title, excerpt, slug, thumbnail, published_at, content, tags, author:authors(id, username, avatar_url)`)
          .order('published_at', { ascending: false })
          .limit(50);

        if (error) throw error;

        // map and ensure thumbnail public url if stored in storage bucket
        const mapped = await Promise.all(
          (data || []).map(async (item) => {
            let thumbnailUrl = item.thumbnail || null;

            // if thumbnail looks like a storage path (e.g., startsWith 'thumbnails/')
            // attempt to get public URL from storage bucket "thumbnails"
            if (thumbnailUrl && !thumbnailUrl.startsWith('http')) {
              try {
                const { data: pu } = supabase.storage.from('thumbnails').getPublicUrl(thumbnailUrl);
                thumbnailUrl = pu.publicUrl;
              } catch (err) {
                console.warn('thumbnail public url error', err);
              }
            }

            const author = item.author?.[0]
              ? { name: item.author[0].username, avatar: item.author[0].avatar_url }
              : { name: 'Author', avatar: null };

            const readingTime = computeReadingTime(item.content || item.excerpt || '');

            return {
              id: item.id,
              title: item.title,
              excerpt: item.excerpt,
              slug: item.slug,
              thumbnail: thumbnailUrl,
              author,
              publishedAt: item.published_at,
              readingTime,
              tags: item.tags || []
            };
          })
        );

        if (mounted) {
          setArticles(mapped);
          setError(null);
        }
      } catch (err) {
        console.error('fetchArticles error', err);
        if (mounted) setError(err.message || 'Error loading articles');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchArticles();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* simple skeleton placeholders */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-white rounded-lg h-64" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((a) => (
        <ArticleCard key={a.id} {...a} />
      ))}
    </div>
  );
}
