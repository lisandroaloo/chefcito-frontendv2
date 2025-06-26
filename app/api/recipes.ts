export async function fetchRecipeById(id: string) {
  const res = await fetch(`https://tu-backend.com/api/recipes/${id}`)
  if (!res.ok) throw new Error("Error al cargar la receta")
  const data = await res.json()
  return data
}