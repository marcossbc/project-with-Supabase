import React, { useOptimistic, useState, useTransition } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

function ManageArticalesPage() {
  
    const { user } = useAuth()
    const navigate = useNavigate()
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [totalCount, setTotalCount] = useState(0)
    const [articleToDelete, setArticleToDelete] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isPending, startTransition] = useTransition()

     const [optimisticArticles, updateOptimisticArticles] = useOptimistic(articles, (state, articlesToRemove) => state.filter(article => article.id !== articlesToRemove))

  return (
    <div>
      <h1>HELOW MANAGE YOW</h1>
    </div>
  )
}

export default ManageArticalesPage
