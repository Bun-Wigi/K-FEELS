import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleMoodQuiz = () => {
    navigate("/quiz/mood");
  };

  const handleRandomQuiz = () => {
    navigate("/quiz/random");
  };

  const handleTrendingQuiz = () => {
    navigate("/quiz/trending"); // NEW: Add trending functionality
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '40px 20px',
      textAlign: 'center',
      paddingTop: '120px' // Space for navbar
    }}>
      <h1 style={{ 
        fontSize: '48px', 
        marginBottom: '20px',
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bold'
      }}>
        K-FEELZ 🎭
      </h1>
      
      <p style={{ 
        fontSize: '20px', 
        color: '#666', 
        marginBottom: '50px',
        lineHeight: '1.6'
      }}>
        Discover your next K-drama obsession based on your mood!
      </p>

      <div style={{ 
        display: 'flex', 
        gap: '20px', // REDUCED gap for 3 buttons
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Mood Quiz Button */}
        <button
          onClick={handleMoodQuiz}
          style={{
            padding: '20px 30px', // REDUCED padding for 3 buttons
            fontSize: '16px', // REDUCED font size
            fontWeight: 'bold',
            color: 'white',
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s ease',
            minWidth: '180px' // REDUCED width
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
          }}
        >
          Take Mood Quiz 🎭
        </button>

        {/* Trending Button - NEW */}
        <button
          onClick={handleTrendingQuiz}
          style={{
            padding: '20px 30px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'white',
            background: 'linear-gradient(45deg, #ff9a56 0%, #ff6b6b 100%)',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
            transition: 'all 0.3s ease',
            minWidth: '180px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
          }}
        >
          Trending Now 🔥
        </button>

        {/* Random Quiz Button */}
        <button
          onClick={handleRandomQuiz}
          style={{
            padding: '20px 30px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'white',
            background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(245, 87, 108, 0.3)',
            transition: 'all 0.3s ease',
            minWidth: '180px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 87, 108, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(245, 87, 108, 0.3)';
          }}
        >
          Random Discovery 🎲
        </button>
      </div>

      <div style={{ 
        marginTop: '60px',
        padding: '30px',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        maxWidth: '700px', // INCREASED for 3 options
        margin: '60px auto 0'
      }}>
        <h3 style={{ 
          fontSize: '24px', 
          marginBottom: '20px',
          color: '#333'
        }}>
          How it works:
        </h3>
        <div style={{ textAlign: 'left', color: '#666' }}>
          <p><strong>🎭 Mood Quiz:</strong> Answer 5 questions about your current feelings and get personalized K-drama recommendations that match your vibe.</p>
          <p><strong>🔥 Trending Now:</strong> See what K-dramas are hot and trending right now - the most popular shows everyone's talking about!</p>
          <p><strong>🎲 Random Discovery:</strong> Feeling adventurous? Get a surprise selection of popular K-dramas from all genres!</p>
        </div>
      </div>
    </div>
  );
}
