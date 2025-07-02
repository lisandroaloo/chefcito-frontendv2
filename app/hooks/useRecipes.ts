import { useState, useEffect } from "react"
import { IRecipe } from "./useCreateRecipe"

export function useRecipes(category: string) {
  const [recipes, setRecipes] = useState<any[]>([])
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
        
        const filteredData: any[] = data

        switch (category) {
          case "Populares":
            setRecipes(filteredData.filter((r: any) => r.re_suitable_for_celiac === false && r.re_suitable_for_vegan === false && r.re_suitable_for_vegetarian === false && r.re_suitable_for_lactose_intolerant === false))
            break;
          case "Veganas":
            setRecipes(filteredData.filter((r: any) => r.re_suitable_for_vegan === true))
            break;
          case "Vegetarianas":
            setRecipes(filteredData.filter((r: any) => r.re_suitable_for_vegetarian === true))
            break;
          case "Sin tacc":
            setRecipes(filteredData.filter((r: any) => r.re_suitable_for_celiac === true))
            break;
          case "Sin lactosa":
            setRecipes(filteredData.filter((r: any) => r.re_suitable_for_lactose_intolerant === true))
            break;
          case "Hamburguesas":
            setRecipes(filteredData.filter((r: any) => r.re_title.toLowerCase().includes("hamburguesa")))
            break;
          default:
            setRecipes(filteredData)
            break;
        }
        
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
