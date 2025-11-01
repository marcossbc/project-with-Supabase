// components/ArticleCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBookmark, FiHeart } from 'react-icons/fi';

export default function ArticleCard({
  id,
  title,
  excerpt,
  slug,
  thumbnail,
  author = { name: 'Author', avatar: null },
  publishedAt,
  readingTime = '5 min',
  tags = []
}) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const toggleLike = (e) => {
    e.preventDefault();
    setLiked((v) => !v);
    // TODO: persist to backend if logged in
  };

  const toggleBookmark = (e) => {
    e.preventDefault();
    setBookmarked((v) => !v);

    const key = 'bookmarks';
    try {
      const stored = JSON.parse(window.localStorage.getItem(key) || '[]');
      if (!bookmarked) {
        window.localStorage.setItem(key, JSON.stringify([...stored, { id, title, slug }]));
      } else {
        window.localStorage.setItem(key, JSON.stringify(stored.filter(item => item.id !== id)));
      }
    } catch (err) {
      console.error('bookmark error', err);
    }
  };

  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <Link to={`/ArticlesList/${slug}`} className="block group">
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-gray-100">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {author.avatar ? (
                  <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    {author.name?.charAt(0) || 'A'}
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-500">
                <div className="font-medium text-gray-900">{author.name}</div>
                <div>{publishedAt ? new Date(publishedAt).toLocaleDateString() : ''} • {readingTime}</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleLike}
                className="p-2 rounded-md hover:bg-gray-100 transition"
                aria-pressed={liked}
                aria-label="Like article"
              >
                <FiHeart className={`w-5 h-5 ${liked ? 'text-rose-500' : 'text-gray-400'}`} />
              </button>
              <button
                onClick={toggleBookmark}
                className="p-2 rounded-md hover:bg-gray-100 transition"
                aria-pressed={bookmarked}
                aria-label="Bookmark article"
              >
                <FiBookmark className={`w-5 h-5 ${bookmarked ? 'text-amber-500' : 'text-gray-400'}`} />
              </button>
            </div>
          </div>

          <h3 className="mt-3 text-lg font-semibold text-gray-900 line-clamp-2">{title}</h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">{excerpt}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {tags.slice(0, 4).map((t) => (
              <span key={t} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                #{t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
