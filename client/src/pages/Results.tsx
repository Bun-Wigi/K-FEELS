//allows to get current route and passed state (answers, mode, etc.)
import { useLocation, Link } from "react-router-dom";
import dramas from "../data/drama.json";
import DramaGrid from "../components/DramaGrid";

const characterImg = {
  main: String,
  detective: String, 
  prince: String, 
  girlboss: String, 
  sidekick: String, 
  villian: String,
  softie: String,
}
  
//    main: "/characters/main.jpg",
//    detective: "/characters/detective.jpg"
//    prince: "/characters/prince.jpg",
//   girlboss: "/characters/girlboss.jpg",
//   softie: "/characters/softie.jpg",
//    sidekick: "/characters/sidekick.jpg"
//   villain: "/characters/villain.jpg",
// };

export default function Results() {
  // get data passed state from Quiz page via navigate state(tagFromAnsw, mode)
  const location = useLocation();
  const state = location.state; //

  // destructure state from Quiz
  const { mode, tagFromAnsw = [], picks = [] } = state;

  // variables to store results
  let list = []; //for final list
  let topTag:any = null; //most frequent tag //is any best type?

  // if random mode → show random picks
  if (mode === "random") {
    list = picks;
  }

  // if user came from quiz
  if (tagFromAnsw.length > 0) {
    // count how many times each tag appears
    const counts = tagFromAnsw.reduce((acc, tag) => {
      acc[tag] = (acc[tag] ?? 0) + 1;
      return acc;
    }, {});

    // find the most frequent tag (topTag)
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    topTag = sorted[0][0]; //get tag with the heighest count

    // filter dramas that include this tag
    list = dramas.filter((oneDrama) => oneDrama.tags.includes(topTag));
  }

  // log what came from quiz (for debug)
  console.log("Mode:", mode);
  console.log("Answers:", tagFromAnsw);
  console.log("Top tag:", topTag);
  console.log("List:", list);

  const charPicture =
    mode === "character" && topTag ? characterImg[topTag] : undefined;

  return (
    <div className="result-page">
      {/* Show title based on mode */}
      <h2>
        {mode === "mood" && topTag
          ? `Your mood today is: ${topTag.toUpperCase()}`
          : mode === "character" && topTag
          ? `Your character type is: ${topTag.toUpperCase()}`
          : "Random pick"}
      </h2>

      {charPicture && (
        <img
          src={charPicture}
          alt={topTag}
          style={{
            width: "250px",
            height: "330px",
            borderRadius: "12px",
            objectFit: "cover",
            boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
            marginBottom: "20px",
          }}
        />
      )}

      {/* Show recommended dramas */}
      {list.length > 0 ? (
        <DramaGrid dramas={list.slice(0, 6)} />
      ) : (
        <p>No matches. Try again.</p>
      )}

      {/* Back button */}
      <div style={{ marginTop: 20 }}>
        <Link to="/">Back Home</Link>
      </div>
    </div>
  );
}
