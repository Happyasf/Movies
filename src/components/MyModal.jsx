import React from "react";
import { Box, Modal, Typography, IconButton, CircularProgress } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useQuery } from "react-query";
import axios from "axios";
import { img_500 } from "../utils";

export const MyModal = ({ open, setOpen, id, type }) => {
  const handleClose = () => setOpen(false);

  // --- Lekérés a film adatainak ---
  const { data: movieData, isLoading: isMovieLoading } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: async () => {
      const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`;
      const res = await axios.get(url);
      return res.data;
    },
    enabled: !!id && !!type,
  });

  // --- Lekérés a szereplők adatainak ---
  const { data: creditsData, isLoading: isCreditsLoading } = useQuery({
    queryKey: ["movieCredits", id],
    queryFn: async () => {
      const url = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`;
      const res = await axios.get(url);
      return res.data;
    },
    enabled: !!id && !!type,
  });

  const [startIndex, setStartIndex] = React.useState(0);

  const handleNext = () => {
    if (creditsData?.cast && startIndex + 4 < creditsData.cast.length)
      setStartIndex(startIndex + 4);
  };

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 4);
  };

  const visibleCast = creditsData?.cast?.slice(startIndex, startIndex + 4) || [];

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          maxWidth: 900,
          bgcolor: "#1b263b",
          color: "white",
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          overflowY: "auto",
          maxHeight: "90vh",
        }}
      >
        {/* FILM ADATOK */}
        {isMovieLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h4" sx={{ mb: 2, color: "#ffcc00", textAlign: "center" }}>
              {movieData?.title || movieData?.name}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={img_500 + movieData?.poster_path}
                alt={movieData?.title}
                sx={{
                  width: { xs: "70%", md: 300 },
                  borderRadius: 3,
                  boxShadow: "0 0 20px rgba(0,0,0,0.5)",
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: "#e0e1dd",
                  textAlign: "justify",
                  maxWidth: 500,
                }}
              >
                {movieData?.overview || "No description available."}
              </Typography>
            </Box>
          </>
        )}

        {/* SZEREPLŐK */}
        <Typography variant="h5" sx={{ mt: 3, mb: 2, textAlign: "center" }}>
          Cast
        </Typography>

        {isCreditsLoading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
            <IconButton onClick={handlePrev} disabled={startIndex === 0} sx={{ color: "white" }}>
              <ArrowBackIosNew />
            </IconButton>

            <Box sx={{ display: "flex", gap: 2 }}>
              {visibleCast.map((actor) => (
                <Box
                  key={actor.cast_id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    bgcolor: "rgba(255,255,255,0.05)",
                    p: 1,
                    borderRadius: 2,
                    width: 120,
                    textAlign: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={
                      actor.profile_path
                        ? img_500 + actor.profile_path
                        : "https://via.placeholder.com/120x180?text=No+Image"
                    }
                    alt={actor.name}
                    sx={{
                      width: 100,
                      height: 150,
                      objectFit: "cover",
                      borderRadius: 2,
                      mb: 1,
                    }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {actor.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#ccc" }}>
                    {actor.character}
                  </Typography>
                </Box>
              ))}
            </Box>

            <IconButton
              onClick={handleNext}
              disabled={startIndex + 4 >= creditsData?.cast?.length}
              sx={{ color: "white" }}
            >
              <ArrowForwardIos />
            </IconButton>
          </Box>
        )}
      </Box>
    </Modal>
  );
};
