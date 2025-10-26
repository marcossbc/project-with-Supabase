// src/lib/articles.js
import supabase from "./supabase";

/**
 * Helper: filter object to only allowed keys and remove undefined values
 */
const filterPayload = (obj, allowed = []) => {
  const out = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (allowed.includes(k) && v !== undefined) out[k] = v;
  });
  return out;
};

// Allowed columns in your articles table
const ALLOWED_COLUMNS = [
  "title",
  "content",
  "tags",
  "author_id",
  "published",
  "featured_image"
];

/**
 * Create a new article
 */
export const createArticle = async (article) => {
  console.log("Creating article with data (incoming):", article);

  // Get current user if authorId not provided
  let authorId = article.authorId || null;
  try {
    if (!authorId) {
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr) {
        console.warn("Couldn't get auth user:", userErr);
      } else if (userData?.user?.id) {
        authorId = userData.user.id;
      }
    }
  } catch (err) {
    console.warn("getUser() threw:", err);
  }

  // Ensure tags is an array
  const tags = Array.isArray(article.tags)
    ? article.tags
    : article.tags
    ? [article.tags]
    : [];

  // Map client fields to DB columns
  const mapped = {
    title: article.title ?? null,
    content: article.content ?? null,
    tags: tags.length > 0 ? tags : null,
    author_id: authorId,
    published: article.published === true,
    featured_image: article.featuredImageUrl ?? article.featured_image ?? null
  };

  const payload = filterPayload(mapped, ALLOWED_COLUMNS);
  console.log("Final payload to insert (filtered):", payload);

  try {
    const { data, error } = await supabase
      .from("articles")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }

    console.log("Article created successfully:", data);
    return data;
  } catch (err) {
    console.error("Unexpected error saving article:", err);
    throw err;
  }
};

/**
 * Update an existing article
 */
export const updateArticle = async (id, updates) => {
  console.log(`Attempting to update article with ID: ${id}`, updates);

  const tags = Array.isArray(updates.tags)
    ? updates.tags
    : updates.tags
    ? [updates.tags]
    : undefined;

  const mapped = {
    title: updates.title,
    content: updates.content,
    tags,
    published: updates.published === true,
    featured_image: updates.featuredImageUrl ?? updates.featured_image
  };

  const payload = filterPayload(mapped, ALLOWED_COLUMNS);
  console.log("Final payload for update (filtered):", payload);

  try {
    const { data, error } = await supabase
      .from("articles")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating article:", error);
      throw error;
    }

    console.log("Article updated successfully:", data);
    return data;
  } catch (err) {
    console.error("Unexpected error updating article:", err);
    throw err;
  }
};
