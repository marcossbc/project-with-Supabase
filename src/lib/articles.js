import supabase from "./supabase";






export const createArticle = async (article) => {

    console.log("Creating article with data: ")

    const articleData = {
        title: article.title,
        content: article.content,
        tags: article.tags,
        author_id: article.authorId,
        published: article.published || false,
        featured_image: article.featuredImageUrl || null
    }

    // insert to supabase

    const { data, error } = await supabase
        .from('articles')
        .insert(articleData)
        .select()
        .single()

    if (error) {
        console.error("Error creating article", error)
        throw error
    }
    console.log("Article created successfully.", data)

    return data
}

export const getArticleById = async (id) => {


    /*
    article -> comments -> users = id, name, 
    */

    const { data, error } = await supabase
        .from('articles')
        .select(`*,
           comments(id,content, created_at,
               user:user_id(id, username, avatar_url)
            ),
            author:author_id(id, username, avatar_url)    
            `)
        .eq('id', id)
        .single()

    if (error) throw error
    return data
}