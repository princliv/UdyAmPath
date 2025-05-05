import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaChevronLeft, FaChevronRight, FaRandom, FaRedo } from 'react-icons/fa';
import { IoMdFlash } from 'react-icons/io';
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const flashcards = [
  {
    id: 1,
    category: 'Operating System',
    question: 'What is a semaphore?',
    answer: 'A semaphore is a variable used to control access to a common resource by multiple processes in a concurrent system.',
    difficulty: 'medium'
  },
  {
    id: 2,
    category: 'Data Structures',
    question: 'What is the time complexity of binary search?',
    answer: 'O(log n) where n is the number of elements in the array.',
    difficulty: 'easy'
  },
  {
    id: 3,
    category: 'OOPS',
    question: 'What is polymorphism?',
    answer: 'Polymorphism is the ability of an object to take on many forms, typically achieved through method overriding and interfaces.',
    difficulty: 'medium'
  },
  {
    id: 4,
    category: 'Java',
    question: 'What is the difference between == and .equals() in Java?',
    answer: '== compares object references while .equals() compares the content/values of objects.',
    difficulty: 'medium'
  },
  {
    id: 5,
    category: 'Operating System',
    question: 'What is virtual memory?',
    answer: 'Virtual memory is a memory management technique that creates an illusion to users of a very large memory by using disk space as an extension of RAM.',
    difficulty: 'hard'
  },
  {
    id: 6,
    category: 'Data Structures',
    question: 'What is a hash collision?',
    answer: 'A hash collision occurs when two different keys generate the same hash value in a hash table.',
    difficulty: 'hard'
  },
];

const FlashCard = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookmarkedCards, setBookmarkedCards] = useState([]);
  const [studyMode, setStudyMode] = useState('sequential'); // 'sequential' or 'random'
  const [showConfetti, setShowConfetti] = useState(false);
  const [cardsMastered, setCardsMastered] = useState(0);

  const categories = ['All', ...new Set(flashcards.map(card => card.category))];

  const filteredCards = selectedCategory === 'All' 
    ? flashcards 
    : flashcards.filter(card => card.category === selectedCategory);

  const currentCard = filteredCards[activeCard];
  const isBookmarked = bookmarkedCards.includes(currentCard?.id);

  useEffect(() => {
    // Load bookmarked cards from localStorage
    const savedBookmarks = JSON.parse(localStorage.getItem('flashcardBookmarks')) || [];
    setBookmarkedCards(savedBookmarks);
  }, []);

  useEffect(() => {
    // Reset to first card when category changes
    setActiveCard(0);
    setIsFlipped(false);
  }, [selectedCategory]);

  const handleNext = () => {
    setIsFlipped(false);
    if (studyMode === 'random') {
      setActiveCard(Math.floor(Math.random() * filteredCards.length));
    } else {
      setActiveCard((prev) => (prev + 1) % filteredCards.length);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setActiveCard((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const toggleBookmark = () => {
    let newBookmarks;
    if (isBookmarked) {
      newBookmarks = bookmarkedCards.filter(id => id !== currentCard.id);
    } else {
      newBookmarks = [...bookmarkedCards, currentCard.id];
    }
    setBookmarkedCards(newBookmarks);
    localStorage.setItem('flashcardBookmarks', JSON.stringify(newBookmarks));
  };

  const markAsMastered = () => {
    setShowConfetti(true);
    setCardsMastered(prev => prev + 1);
    setTimeout(() => setShowConfetti(false), 3000);
    handleNext();
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FFC107';
      case 'hard': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  return (
    <div style={styles.container}>
      {showConfetti && (
        <div style={styles.confettiContainer}>
          {[...Array(50)].map((_, i) => (
            <div 
              key={i}
              style={{
                ...styles.confetti,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

      <div style={styles.header}>
        <Link to="/notes" style={styles.backButton}>
          <FaArrowLeft size={20} />
        </Link>
        <div>
          <h1 style={styles.title}>
            <IoMdFlash style={{ marginRight: '10px' }} />
            Flash Notes
          </h1>
          <p style={styles.subtitle}>Quick revision for technical concepts</p>
        </div>
        <div style={styles.stats}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{filteredCards.length}</span>
            <span style={styles.statLabel}>Cards</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{cardsMastered}</span>
            <span style={styles.statLabel}>Mastered</span>
          </div>
        </div>
      </div>

      <div style={styles.controls}>
        <div style={styles.controlGroup}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={styles.select}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          
          <button 
            onClick={() => setStudyMode(prev => prev === 'sequential' ? 'random' : 'sequential')}
            style={{
              ...styles.modeButton,
              backgroundColor: studyMode === 'random' ? '#3498db' : '#e0e0e0',
              color: studyMode === 'random' ? 'white' : '#333',
            }}
          >
            <FaRandom style={{ marginRight: '5px' }} />
            {studyMode === 'random' ? 'Random' : 'Sequential'}
          </button>
        </div>
      </div>

      <div style={styles.cardContainer}>
        <button 
          onClick={handlePrev} 
          style={styles.navButton}
          disabled={filteredCards.length <= 1}
        >
          <FaChevronLeft size={20} />
        </button>

        <AnimatePresence mode='wait'>
          <motion.div
            key={currentCard?.id || 'empty'}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              onClick={handleFlip}
              style={{
                ...styles.card,
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
                backgroundColor: isFlipped ? '#f8f9fa' : '#ffffff',
              }}
            >
              {!isFlipped ? (
                <div style={styles.cardContent}>
                  <div style={styles.cardHeader}>
                    <div style={{
                      ...styles.difficultyBadge,
                      backgroundColor: getDifficultyColor(currentCard?.difficulty)
                    }}>
                      {currentCard?.difficulty}
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark();
                      }}
                      style={styles.bookmarkButton}
                    >
                      {isBookmarked ? 
                        <RiBookmarkFill color="#3498db" size={24} /> : 
                        <RiBookmarkLine color="#aaa" size={24} />
                      }
                    </button>
                  </div>
                  <h3 style={styles.cardQuestion}>
                    {currentCard?.question}
                  </h3>
                  <p style={styles.hintText}>Click to reveal answer</p>
                </div>
              ) : (
                <div style={styles.cardContent}>
                  <div style={styles.cardHeader}>
                    <div style={{
                      ...styles.difficultyBadge,
                      backgroundColor: getDifficultyColor(currentCard?.difficulty)
                    }}>
                      {currentCard?.difficulty}
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark();
                      }}
                      style={styles.bookmarkButton}
                    >
                      {isBookmarked ? 
                        <RiBookmarkFill color="#3498db" size={24} /> : 
                        <RiBookmarkLine color="#aaa" size={24} />
                      }
                    </button>
                  </div>
                  <p style={styles.cardAnswer}>
                    {currentCard?.answer}
                  </p>
                  <p style={styles.hintText}>Click to see question</p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <button 
          onClick={handleNext} 
          style={styles.navButton}
          disabled={filteredCards.length <= 1}
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      <div style={styles.progressContainer}>
        <div style={styles.progressBar}>
          <div 
            style={{
              ...styles.progressFill,
              width: `${((activeCard + 1) / filteredCards.length) * 100}%`
            }}
          />
        </div>
        <span style={styles.progressText}>
          Card {activeCard + 1} of {filteredCards.length}
        </span>
      </div>

      <div style={styles.actions}>
        <button 
          onClick={handleFlip}
          style={styles.actionButton}
        >
          <FaRedo style={{ marginRight: '8px' }} />
          {isFlipped ? 'Show Question' : 'Show Answer'}
        </button>
        
        <button 
          onClick={markAsMastered}
          style={{
            ...styles.actionButton,
            backgroundColor: '#4CAF50',
            color: 'white',
          }}
        >
          I Know This!
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f5f7fa',
    position: 'relative',
    overflow: 'hidden',
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 100,
  },
  confetti: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    opacity: 0,
    animation: 'confetti-fall 3s ease-in-out forwards',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '900px',
    marginBottom: '30px',
    position: 'relative',
  },
  backButton: {
    color: '#3498db',
    padding: '10px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#e3f2fd',
      transform: 'translateX(-3px)',
    },
  },
  title: {
    fontSize: '2rem',
    color: '#2c3e50',
    marginBottom: '5px',
    display: 'flex',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#7f8c8d',
    textAlign: 'center',
  },
  stats: {
    display: 'flex',
    gap: '20px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#3498db',
  },
  statLabel: {
    fontSize: '0.8rem',
    color: '#7f8c8d',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '900px',
    marginBottom: '30px',
  },
  controlGroup: {
    display: 'flex',
    gap: '15px',
    width: '100%',
  },
  select: {
    flex: 1,
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    fontSize: '1rem',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  modeButton: {
    padding: '12px 15px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  cardContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    width: '100%',
    maxWidth: '900px',
    marginBottom: '30px',
  },
  navButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
    '&:hover': {
      backgroundColor: '#2980b9',
      transform: 'scale(1.1)',
    },
    '&:disabled': {
      backgroundColor: '#e0e0e0',
      cursor: 'not-allowed',
      transform: 'none',
    },
  },
  card: {
    width: '100%',
    minHeight: '350px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    padding: '30px',
    cursor: 'pointer',
    transition: 'transform 0.6s, background 0.3s, box-shadow 0.3s',
    transformStyle: 'preserve-3d',
    position: 'relative',
    perspective: '1000px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '&:hover': {
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
    },
  },
  cardContent: {
    backfaceVisibility: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  difficultyBadge: {
    color: 'white',
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  bookmarkButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  cardQuestion: {
    fontSize: '1.8rem',
    color: '#2c3e50',
    marginBottom: '20px',
    textAlign: 'center',
    lineHeight: '1.4',
  },
  cardAnswer: {
    fontSize: '1.4rem',
    color: '#2c3e50',
    lineHeight: '1.6',
    textAlign: 'center',
  },
  hintText: {
    color: '#7f8c8d',
    fontSize: '0.9rem',
    textAlign: 'center',
    marginTop: '20px',
  },
  progressContainer: {
    width: '100%',
    maxWidth: '900px',
    marginBottom: '30px',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '10px',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },
  progressText: {
    fontSize: '0.9rem',
    color: '#7f8c8d',
    textAlign: 'center',
    display: 'block',
  },
  actions: {
    display: 'flex',
    gap: '15px',
    width: '100%',
    maxWidth: '900px',
    justifyContent: 'center',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '15px 25px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
    '&:hover': {
      backgroundColor: '#2980b9',
      transform: 'translateY(-2px)',
    },
  },
};

export default FlashCard;