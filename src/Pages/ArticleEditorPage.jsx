import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

function ArticleEditorPage() {
   const isEditMode = Boolean(id)

    // State for article data
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('') // Always initialize as an empty string
    const [selectedTags, setSelectedTags] = useState([])
    const [isSaving, setIsSaving] = useState(false)
    const [isTagsMenuOpen, setIsTagsMenuOpen] = useState(false)
    const [featuredImageUrl, setFeaturedImageUrl] = useState('')
    const [isPublished, setIsPublished] = useState(false)
    const [error, setError] = useState(null)

    // State for image upload
    const [selectedImage, setSelectedImage] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [imagePath, setImagePath] = useState('')

    const { user } = useAuth()
    const navigate = useNavigate()



  return (
    
  )
}

export default ArticleEditorPage
