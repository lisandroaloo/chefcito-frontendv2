import { useState, useEffect } from "react"

export function useRecipes(category: string) {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!category) return

    const fetchRecipes = async () => {
      setLoading(true)
      try {
        const res = await fetch("http://localhost:8080/api/recipe")
        if (!res.ok) throw new Error("Error en la respuesta del servidor")
        const data = await res.json()
        setRecipes(data)
        setError(null)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [category])

  return { recipes, loading, error }
}
