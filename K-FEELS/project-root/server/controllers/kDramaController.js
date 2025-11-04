const TMDB_BASE_URL = "https://api.themoviedb.org/";
const TMDB_API_KEY = ""; // <-- INSERT YOUR TMDB API KEY HERE

export const getKoreanDramas = async (req, res) => {
  try {
    const apiKey = TMDB_API_KEY;
    const url = `${TMDB_BASE_URL}/tv/popular?api_key=${apiKey}&language=ko-KR&region=KR&page=1`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `TMDB API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    res.status(200).json(data); // or dramasOnly if filtering
  } catch (error) {
    console.error("Error fetching K-dramas:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch K-dramas", error: error.message });
  }
};
