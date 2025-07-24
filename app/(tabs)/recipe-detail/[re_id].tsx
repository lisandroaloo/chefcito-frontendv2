import { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, Image, ActivityIndicator } from "react-native"
import { Card, Text, IconButton, useTheme, Surface, Dialog, Portal, Button, TextInput } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useLocalSearchParams } from "expo-router"
import { useRecipeDetail } from "@/app/hooks/useRecipeDetail"
import { useAuth } from "@/app/context/AuthContext"
import { useSaveReview } from "@/app/hooks/useSaveReview"

export default function RecipeDetailScreen() {
  const { re_id } = useLocalSearchParams();
  const theme = useTheme()
  const { recipe, loading, error } = useRecipeDetail(re_id)
  const [favorito, setFavorito] = useState(false)
  const [rxuId, setRxuId] = useState<string | null>(null)
  const [loadingFav, setLoadingFav] = useState(false)
  const { userId, user } = useAuth()
  const { saveReview } = useSaveReview()
  const [portionMultiplier, setPortionMultiplier] = useState(1)
  const [sendingReview, setSendingReview] = useState(false);

  // Estados relacionados a reseñas y diálogo
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false)
  const [viewingReviews, setViewingReviews] = useState(false)
  const [newReview, setNewReview] = useState("")
  const [reviewRating, setReviewRating] = useState(0)
  const [writingReview, setWritingReview] = useState(false)
  const [userReviews, setUserReviews] = useState<{ user: string; comment: string; rating: number }[]>([])
  const [loadingReviews, setLoadingReviews] = useState(false)

  const averageRating = userReviews.length > 0
    ? userReviews.reduce((acc, r) => acc + r.rating, 0) / userReviews.length
    : 0;

  const stars = [1, 2, 3, 4, 5];

  function getStarIcon(star: number) {
    const fullStars = Math.floor(averageRating);
    const decimalPart = averageRating - fullStars;

    if (star <= fullStars) {
      return "star";
    }
    if (star === fullStars + 1) {
      if (decimalPart >= 0.75) return "star";
      if (decimalPart >= 0.25) return "star-half-full";
      return "star-outline";
    }
    return "star-outline";
  }

  useEffect(() => {
    const fetchAlreadyReviewed = async () => {
      if (!userId || !re_id) return;

      try {
        const res = await fetch(`http://localhost:8084/api/recipe/check-review/${re_id}/user/${userId}`);
        const result = await res.json();
        setAlreadyReviewed(result.body === true);
      } catch (error) {
        console.error("Error verificando si ya se hizo la review:", error);
      }
    };

    fetchAlreadyReviewed();
  }, [userId, re_id]);

  useEffect(() => {
    if (!re_id) return;

    const fetchReviews = async () => {
      setLoadingReviews(true);
      try {
        const res = await fetch(`http://localhost:8084/api/recipe/reviews/${re_id}`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();

        const formattedReviews = data.map((r: any) => ({
          user: r.us_name,
          comment: r.review,
          rating: r.stars,
        }));

        setUserReviews(formattedReviews);
      } catch (error) {
        console.error("Error cargando reseñas:", error);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const fetchFavorito = async () => {
      try {
        const res = await fetch(`http://localhost:8084/api/pending-recipe-x-user/user/1/recipe/${re_id}`);

        if (res.status === 200) {
          const data = await res.json();
          if (data && data.rxu_id) {
            setFavorito(true);
            setRxuId(data.rxu_id);
          }
        } else if (res.status === 404) {
          setFavorito(false);
          setRxuId(null);
        } else {
          console.error("Error inesperado al verificar favorito:", res.status);
        }
      } catch (err) {
        console.error("Error al verificar favorito", err);
      }
    };

    fetchFavorito();
  }, []);

  const toggleFavorito = async () => {
    if (!re_id) return;

    setLoadingFav(true);

    try {
      if (favorito && rxuId) {
        await fetch(`http://localhost:8084/api/pending-recipe-x-user/${rxuId}`, {
          method: "DELETE",
        });
        setFavorito(false);
        setRxuId(null);
      } else {
        const res = await fetch(`http://localhost:8084/api/pending-recipe-x-user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            rxu_re_id: re_id, rxu_us_id: 1
          }),
        });
        const data = await res.json();
        setFavorito(true);
        setRxuId(data.rxu_id);
      }
    } catch (err) {
      console.error("Error al cambiar estado favorito", err);
    } finally {
      setLoadingFav(false);
    }
  };

  if (loading) {
    return (
      <Surface
        style={[
          styles.container,
          { backgroundColor: theme.colors.background, justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.secondary} />
      </Surface>
    )
  }

  if (error) {
    return (
      <Surface
        style={[
          styles.container,
          { backgroundColor: theme.colors.background, justifyContent: "center", alignItems: "center", padding: 20 },
        ]}
      >
        <Text variant="bodyLarge" style={{ color: "red", textAlign: "center" }}>
          {error}
        </Text>
      </Surface>
    )
  }

  if (!recipe) {
    return null
  }

  const ingredients: any[] = recipe.ingredients ?? []
  const steps: string[] = recipe.steps ?? []
  const title: string = recipe.re_title ?? "Receta sin título"
  const imageUri: string =
    recipe.re_picture ?? "https://via.placeholder.com/400x200/FF9500/FFFFFF?text=Imagen+no+disponible"
  const description: string = recipe.description ?? "Descripción no disponible."

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={{ uri: imageUri }} style={styles.recipeImage} />

          <View style={styles.content}>
            <View style={styles.header}>
              <Text variant="headlineMedium" style={[styles.title, { color: "#FFFFFF" }]}>
                {title}
              </Text>
              <IconButton
                icon={favorito ? "heart" : "heart-outline"}
                size={24}
                iconColor="#FFFFFF"
                onPress={toggleFavorito}
                disabled={loadingFav}
              />
            </View>

            <View style={styles.rating}>
              {stars.map((star) => (
                <IconButton
                  key={star}
                  icon={getStarIcon(star)}
                  size={20}
                  iconColor="#FFD700"
                  style={styles.star}
                  onPress={() => setDialogVisible(true)}
                />
              ))}
            </View>

            <View style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              paddingVertical: 12,
              backgroundColor: theme.colors.surfaceVariant,
              borderRadius: 12,
              marginBottom: 16,
            }}>
              <Button
                mode="outlined"
                onPress={() => setPortionMultiplier(Math.max(1, portionMultiplier - 1))}
                contentStyle={{ paddingHorizontal: 6 }}
                labelStyle={{ fontSize: 20 }}
              >
                −
              </Button>

              <View style={{ paddingHorizontal: 12 }}>
                <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
                  Porciones: {portionMultiplier}
                </Text>
              </View>

              <Button
                mode="outlined"
                onPress={() => setPortionMultiplier(portionMultiplier + 1)}
                contentStyle={{ paddingHorizontal: 6 }}
                labelStyle={{ fontSize: 20 }}
              >
                +
              </Button>
            </View>

            <Card style={styles.section} mode="elevated" elevation={2}>
              <Card.Content style={styles.sectionContent}>
                <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.secondary }]}>
                  Ingredientes
                </Text>
                <View style={styles.ingredientsList}>
                  {ingredients.length > 0 ? (
                    ingredients.map((ingredient, index) => (
                      <View key={index} style={styles.ingredientItem}>
                        <Text variant="bodyMedium" style={styles.ingredientText}>
                          • {ingredient.name} — {parseFloat(ingredient.quantity) * portionMultiplier} {ingredient.unit}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text variant="bodyMedium">No hay ingredientes listados.</Text>
                  )}
                </View>
              </Card.Content>
            </Card>

            <Card style={styles.section} mode="elevated" elevation={2}>
              <Card.Content style={styles.sectionContent}>
                <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.secondary }]}>
                  Paso a paso
                </Text>
                <View style={styles.stepsList}>
                  {steps.length > 0 ? (
                    steps.map((step, index) => (
                      <View key={index} style={styles.stepItem}>
                        <View style={styles.stepNumberContainer}>
                          <Text variant="bodyMedium" style={[styles.stepNumber, { color: theme.colors.secondary }]}>
                            {index + 1}
                          </Text>
                        </View>
                        <Text variant="bodyMedium" style={styles.stepText}>
                          {step}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text variant="bodyMedium">No hay pasos listados.</Text>
                  )}
                </View>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => {
            setDialogVisible(false)
            setViewingReviews(false)
            setWritingReview(false)
            setNewReview("")
            setReviewRating(0)
          }}
        >
          <Dialog.Title>
            {writingReview ? "Dejar reseña" : viewingReviews ? "Reseñas" : "Valoración"}
          </Dialog.Title>

          <Dialog.Content>
            {sendingReview ? (
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 16 }}>
                <ActivityIndicator size="small" color={theme.colors.primary} />
                <Text style={{ marginLeft: 12 }}>Enviando reseña...</Text>
              </View>
            ) : writingReview ? (
              <>
                <Text variant="bodyMedium" style={{ marginBottom: 8 }}>Puntaje:</Text>
                <View style={{ flexDirection: "row", marginBottom: 16 }}>
                  {stars.map((star) => (
                    <IconButton
                      key={star}
                      icon={star <= reviewRating ? "star" : "star-outline"}
                      iconColor="#FFD700"
                      size={24}
                      onPress={() => setReviewRating(star)}
                      disabled={sendingReview}
                    />
                  ))}
                </View>

                <Text variant="bodyMedium" style={{ marginBottom: 8 }}>Escribí tu reseña:</Text>
                <TextInput
                  mode="outlined"
                  multiline
                  value={newReview}
                  onChangeText={setNewReview}
                  placeholder="Ej: Muy buena receta..."
                  style={{ marginBottom: 16 }}
                  editable={!sendingReview}
                />
              </>
            ) : viewingReviews ? (
              loadingReviews ? (
                <ActivityIndicator size="small" color={theme.colors.primary} />
              ) : userReviews.length > 0 ? (
                userReviews.map((review, index) => (
                  <View key={index} style={{ marginBottom: 10 }}>
                    <Text variant="bodyMedium" style={{ fontWeight: "bold" }}>{review.user}</Text>
                    <View style={{ flexDirection: "row", marginVertical: 4 }}>
                      {stars.map((star) => (
                        <IconButton
                          key={star}
                          icon={star <= (review.rating ?? 3) ? "star" : "star-outline"}
                          iconColor="#FFD700"
                          size={16}
                          style={{ margin: -4 }}
                          disabled
                        />
                      ))}
                    </View>
                    <Text variant="bodySmall">{review.comment}</Text>
                  </View>
                ))
              ) : (
                <Text variant="bodyMedium">No hay reseñas todavía.</Text>
              )
            ) : (
              <Text variant="bodyMedium">¿Qué querés hacer?</Text>
            )}
          </Dialog.Content>

          <Dialog.Actions>
            {writingReview ? (
              <>
                <Button
                  onPress={async () => {
                    if (reviewRating === 0) {
                      alert("Por favor, asigná un puntaje.");
                      return;
                    }
                    if (newReview.trim().length === 0) {
                      alert("Por favor, escribí tu reseña.");
                      return;
                    }

                    setSendingReview(true);
                    try {
                      // Aquí iría el llamado a saveReview o la API para guardar la reseña
                      await saveReview(re_id, userId, reviewRating, newReview);
                      alert("Reseña enviada con éxito");
                      setDialogVisible(false);
                      setWritingReview(false);
                      setNewReview("");
                      setReviewRating(0);
                      setAlreadyReviewed(true);
                      // Actualizar la lista de reseñas
                      setUserReviews(prev => [...prev, { user: user?.name || "Tú", comment: newReview, rating: reviewRating }]);
                    } catch (error) {
                      alert("Error enviando la reseña.");
                      console.error(error);
                    } finally {
                      setSendingReview(false);
                    }
                  }}
                  disabled={sendingReview}
                >
                  Enviar
                </Button>

                <Button
                  onPress={() => {
                    setWritingReview(false);
                    setNewReview("");
                    setReviewRating(0);
                  }}
                  disabled={sendingReview}
                >
                  Cancelar
                </Button>
              </>
            ) : viewingReviews ? (
              <Button onPress={() => setViewingReviews(false)}>Volver</Button>
            ) : (
              <>
                <Button
                  onPress={() => {
                    if (!userId) {
                      alert("Tenés que iniciar sesión para dejar una reseña.");
                      return;
                    }
                    if (alreadyReviewed) {
                      alert("Ya dejaste una reseña para esta receta.");
                      return;
                    }
                    setWritingReview(true);
                  }}
                >
                  Dejar reseña
                </Button>

                <Button onPress={() => setViewingReviews(true)}>Ver reseñas</Button>
              </>
            )}
          </Dialog.Actions>
        </Dialog>
      </Portal>

    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  recipeImage: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
  },
  rating: {
    flexDirection: "row",
    marginBottom: 16,
    marginLeft: -8,
  },
  star: {
    margin: 0,
  },
  description: {
    marginBottom: 24,
    lineHeight: 24,
  },
  section: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  sectionContent: {
    padding: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 16,
  },
  ingredientsList: {
    gap: 8,
  },
  ingredientItem: {
    paddingVertical: 2,
  },
  ingredientText: {
    fontSize: 14,
    lineHeight: 20,
  },
  stepsList: {
    gap: 12,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  stepNumberContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: "bold",
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
})
