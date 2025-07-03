import { useState, useEffect } from "react"

export function useRecipeDetail(re_id: string | undefined) {
  const [recipe, setRecipe] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!re_id) {
      setError("ID de receta no proporcionado")
      setLoading(false)
      return
    }

    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/recipe/${re_id}`)
        if (!res.ok) throw new Error("Error al cargar la receta")
        const data = await res.json()
        setRecipe(data)
        setError(null)
      } catch (err: any) {
        setError(err.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [re_id])

  return { recipe, loading, error }
}
