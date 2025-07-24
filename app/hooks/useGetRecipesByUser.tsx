import { useState, useEffect } from "react"
import { IRecipe } from "./useCreateRecipe"

export function useGetRecipesByUser(userName: string) {
  const [recipes, setRecipes] = useState<IRecipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!userName) return

    const fetchRecipes = async () => {
      setLoading(true)
      try {
        const res = await fetch("http://localhost:8084/api/recipe/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ us_name: userName }),
        })

        if (!res.ok) throw new Error("Error en la respuesta del servidor")

        const data: IRecipe[] = await res.json()
        setRecipes(data)
        setError(null)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [userName])

  return { recipes, loading, error }
}
