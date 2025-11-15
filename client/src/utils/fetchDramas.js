// utils/fetchDramas.js
const API_BASE = "http://localhost:3000";
const LS_KEY = "kfeels_dramas_v1";

// Быстрые теги по жанрам TMDB (TV): https://developer.themoviedb.org/reference/genre-tv-list
const TAG_BY_GENRE = {
  18: "melodrama",
  35: "comedy",
  10749: "romance",
  9648: "mystery",
  80: "crime",
  10765: "fantasy",
  10759: "action",
  10768: "war",
  16: "animation",
};

function normalize(item) {
  return {
    id: item.id,
    title: item.name || item.title || "Untitled",
    year: (item.first_air_date || item.release_date || "").slice(0, 4),
    poster: item.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
      : null,
    rating: Number((item.vote_average ?? 0).toFixed(1)),
    tags: (item.genre_ids || []).map((g) => TAG_BY_GENRE[g]).filter(Boolean),
  };
}

export function getCachedDramas() {
  const raw = localStorage.getItem(LS_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function loadDramasOnce(limit = 10) {
  // 1) отдать кэш, если уже есть
  const cached = getCachedDramas();
  if (cached?.length) return cached;

  // 2) забираем с сервера (или напрямую из TMDB, если так настроено)
  const res = await fetch(`${API_BASE}/api/dramas`); // твой backend-роут
  if (!res.ok) throw new Error("Failed to fetch /api/dramas");
  const data = await res.json();

  // TMDB обычно возвращает { results: [...] }
  const rawItems = Array.isArray(data) ? data : data.results || [];
  const normalized = rawItems.slice(0, limit).map(normalize);

  // 3) сохраняем в localStorage
  localStorage.setItem(LS_KEY, JSON.stringify(normalized));
  console.log("✅ Saved dramas to localStorage:", normalized);

  return normalized;
}
