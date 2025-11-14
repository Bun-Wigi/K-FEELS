import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleMoodQuiz = () => {
    navigate("/quiz/mood");
  };

  const handleRandomQuiz = () => {
    navigate("/quiz/random");
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
        gap: '30px', 
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Mood Quiz Button */}
        <button
          onClick={handleMoodQuiz}
          style={{
            padding: '20px 40px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'white',
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s ease',
            minWidth: '200px'
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

        {/* Random Quiz Button */}
        <button
          onClick={handleRandomQuiz}
          style={{
            padding: '20px 40px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'white',
            background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(245, 87, 108, 0.3)',
            transition: 'all 0.3s ease',
            minWidth: '200px'
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
        maxWidth: '600px',
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
          <p><strong>🎲 Random Discovery:</strong> Feeling adventurous? Get a surprise selection of popular K-dramas from all genres!</p>
        </div>
      </div>
    </div>
  );
}
