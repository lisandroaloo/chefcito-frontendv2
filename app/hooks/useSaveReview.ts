import { useState } from "react"



export function useSaveReview() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const saveReview = async (re_id :any , userId:any , reviewRating:any , newReview:any ) => {
        setLoading(true)
        try {
            const res = await fetch("http://localhost:8084/api/recipe/review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    re_id: re_id,
                    us_id: userId,
                    stars: reviewRating,
                    review: newReview,
                }),
            })

            if (!res.ok) throw new Error("Error en la respuesta del servidor")

            setError(null)
            return true
        } catch (err: any) {
            setError(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    return { saveReview, loading, error }
}
