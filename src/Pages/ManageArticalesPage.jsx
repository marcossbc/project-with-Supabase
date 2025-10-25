import React, { useState, useTransition } from 'react'
import { useNavigate } from 'react-router'

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
  return (
    <div>
      <h1>HELOW MANAGE YOW</h1>
    </div>
  )
}

export default ManageArticalesPage
