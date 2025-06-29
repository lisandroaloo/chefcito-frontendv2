import { useState } from "react"

export interface IRecipe {
  us_id: number
  picture: string
  title: string
  vegan: boolean
  vegetarian: boolean
  celiac: boolean
  lactose: boolean
  ingredients: string[]
  steps: string[]
}


export function useCreateRecipe() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const createRecipe = async (recipe: IRecipe) => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:8080/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      })

      if (!res.ok) throw new Error("Error en la respuesta del servidor")

      setError(null)
      return await res.json()
    } catch (err: any) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { createRecipe, loading, error }
}
