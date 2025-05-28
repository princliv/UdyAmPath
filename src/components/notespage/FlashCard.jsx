import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { FaChevronLeft, FaChevronRight, FaRandom, FaRedo } from 'react-icons/fa';
import { IoMdFlash } from 'react-icons/io';
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri';
import { useWindowSize } from 'react-use';

const FlashCard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [activeCard, setActiveCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookmarkedCards, setBookmarkedCards] = useState([]);
  const [studyMode, setStudyMode] = useState('sequential');
  const [showConfetti, setShowConfetti] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [masteredCount, setMasteredCount] = useState(0);
  const [showMasteredMessage, setShowMasteredMessage] = useState(false);
  const [masteredCards, setMasteredCards] = useState([]);
  const { width, height } = useWindowSize();

  const [currentBatch, setCurrentBatch] = useState(0);
  const [batchSize] = useState(20);
  const [batches, setBatches] = useState([]);

  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    fetch('/flashcards.json')
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        setFlashcards(data);
        const newBatches = [];
        for (let i = 0; i < data.length; i += batchSize) {
          newBatches.push(data.slice(i, i + batchSize));
        }
        setBatches(newBatches);
        setFilteredCards(newBatches[0] || []);
        setCategories(['All', ...new Set(data.map(card => card.category))]);
      })
      .catch(error => console.error('Error loading flashcards:', error));
  }, [batchSize]);

  useEffect(() => {
    const newFilteredCards = selectedCategory === 'All'
      ? [...(batches[currentBatch] || [])]
      : (batches[currentBatch] || []).filter(card => card.category === selectedCategory);
    
    setFilteredCards(newFilteredCards);
    setActiveCard(0);
    setIsFlipped(false);
  }, [selectedCategory, currentBatch, batches]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('flashcardBookmarks')) || [];
    setBookmarkedCards(savedBookmarks);
  }, []);

  const currentCard = filteredCards[activeCard];
  const isBookmarked = bookmarkedCards.includes(currentCard?.id);
  const isMastered = currentCard ? masteredCards.includes(currentCard.id) : false;

  const handleNext = () => {
    setIsFlipped(false);
    
    if (studyMode === 'random') {
      setActiveCard(Math.floor(Math.random() * filteredCards.length));
    } else {
      if (activeCard + 1 >= filteredCards.length) {
        if (currentBatch + 1 < batches.length) {
          setCurrentBatch(currentBatch + 1);
        } else {
          setCurrentBatch(0);
        }
        setActiveCard(0);
      } else {
        setActiveCard(prev => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (activeCard === 0) {
      if (currentBatch > 0) {
        setCurrentBatch(currentBatch - 1);
        setActiveCard((batches[currentBatch - 1]?.length || 1) - 1);
      } else {
        setCurrentBatch(batches.length - 1);
        setActiveCard((batches[batches.length - 1]?.length || 1) - 1);
      }
    } else {
      setActiveCard(prev => prev - 1);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const toggleBookmark = (e) => {
    e.stopPropagation();
    const newBookmarks = isBookmarked
      ? bookmarkedCards.filter(id => id !== currentCard.id)
      : [...bookmarkedCards, currentCard.id];
    setBookmarkedCards(newBookmarks);
    localStorage.setItem('flashcardBookmarks', JSON.stringify(newBookmarks));
  };

  const markAsMastered = () => {
    if (!currentCard || isMastered) return;
    
    const newMasteredCards = [...masteredCards, currentCard.id];
    setMasteredCards(newMasteredCards);
    
    setMasteredCount(prev => {
      const newCount = prev + 1;
      if ([10, 15, 20].includes(newCount)) {
        setShowMasteredMessage(true);
        setTimeout(() => setShowMasteredMessage(false), 5000);
      }
      return newCount;
    });
    
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    handleNext();
  };

  const shuffleCards = () => {
    if (!shuffled) {
      setOriginalOrder([...filteredCards]);
      const shuffledCards = [...filteredCards].sort(() => Math.random() - 0.5);
      setFilteredCards(shuffledCards);
      setShuffled(true);
    } else {
      setFilteredCards([...originalOrder]);
      setShuffled(false);
    }
    setActiveCard(0);
    setIsFlipped(false);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'hard': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getCategoryColor = (category) => {
    if (!category) return '#E5E7EB';
    const colors = [
      { bg: '#DBEAFE', text: '#1E40AF' },
      { bg: '#D1FAE5', text: '#065F46' },
      { bg: '#FEF3C7', text: '#92400E' },
      { bg: '#FEE2E2', text: '#991B1B' },
      { bg: '#EDE9FE', text: '#5B21B6' },
      { bg: '#FCE7F3', text: '#9D174D' },
      { bg: '#E0E7FF', text: '#3730A3' }
    ];
    const hash = category.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return colors[hash % colors.length];
  };

  if (flashcards.length === 0 && !currentCard) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingContent}>
          <div style={styles.loadingIcon}>
            <IoMdFlash style={styles.flashIcon} />
          </div>
          <h2 style={styles.loadingTitle}>Loading flashcards...</h2>
        </div>
      </div>
    );
  }

  const categoryColors = currentCard ? getCategoryColor(currentCard.category) : { bg: '#E5E7EB', text: '#4B5563' };

  return (
    <div style={styles.appContainer}>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
        />
      )}

      {showMasteredMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          style={styles.masteredMessage}
        >
          <div style={styles.masteredMessageContent}>
            <IoMdFlash style={styles.masteredMessageIcon} />
            <div>
              <h3 style={styles.masteredMessageTitle}>Amazing Progress!</h3>
              <p style={styles.masteredMessageText}>
                You've mastered {masteredCount} concepts! Your knowledge is growing impressively.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <div style={styles.headerContainer}>
        <div style={styles.headerLogo}>
          <IoMdFlash style={styles.headerFlashIcon} />
          <h1 style={styles.headerTitle}>Flash Notes</h1>
        </div>
        <p style={styles.headerSubtitle}>Quick revision for technical concepts</p>
      </div>

      {/* Stats Bar */}
      <div style={styles.statsContainer}>
        <div style={styles.statItem}>
          <span style={{ ...styles.statDot, backgroundColor: '#3B82F6' }}></span>
          <span style={styles.statText}>
            Current: <span style={styles.statBold}>{activeCard + 1}</span> / {filteredCards.length}
          </span>
        </div>
        <div style={styles.statItem}>
          <span style={{ ...styles.statDot, backgroundColor: '#8B5CF6' }}></span>
          <span style={styles.statText}>
            Bookmarked: <span style={styles.statBold}>{bookmarkedCards.length}</span>
          </span>
        </div>
        <div style={styles.statItem}>
          <span style={{ ...styles.statDot, backgroundColor: '#10B981' }}></span>
          <span style={styles.statText}>
            Mastered: <span style={styles.statBold}>{masteredCount}</span>
          </span>
        </div>
      </div>

      {/* Controls Section */}
      <div style={styles.controlsContainer}>
        <div style={styles.controlsInner}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={styles.categorySelect}
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
              ...styles.controlButton,
              backgroundColor: studyMode === 'random' ? '#3B82F6' : '#F3F4F6',
              color: studyMode === 'random' ? 'white' : '#374151'
            }}
          >
            <FaRandom style={styles.controlIcon} />
            {studyMode === 'random' ? 'Random' : 'Sequential'}
          </button>

          <button
            onClick={shuffleCards}
            style={{
              ...styles.controlButton,
              backgroundColor: shuffled ? '#10B981' : '#F3F4F6',
              color: shuffled ? 'white' : '#374151'
            }}
          >
            <FaRandom style={styles.controlIcon} />
            {shuffled ? 'Unshuffle' : 'Shuffle'}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={styles.progressContainer}>
        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: `${(filteredCards.length > 0 ? ((activeCard + 1) / filteredCards.length) : 0) * 100}%`
            }}
          />
        </div>
        <div style={styles.progressText}>
          <span>Card {activeCard + 1} of {filteredCards.length}</span>
          <span>{filteredCards.length > 0 ? Math.round(((activeCard + 1) / filteredCards.length) * 100) : 0}% Complete</span>
        </div>
      </div>

      {/* Flashcard Container */}
      <div style={styles.flashcardWrapper}>
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={filteredCards.length <= 1}
          style={styles.navButtonLeft}
        >
          <FaChevronLeft />
        </button>

        {/* Flashcard */}
        <div style={styles.flashcardContainer}>
          <AnimatePresence mode='wait'>
            {currentCard ? (
              <motion.div
                key={currentCard.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                style={styles.motionContainer}
              >
                <div
                  onClick={handleFlip}
                  style={{
                    ...styles.flashcard,
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'
                  }}
                >
                  {/* Front of the card (Question) */}
                  <div style={{
                    ...styles.cardSide,
                    visibility: isFlipped ? 'hidden' : 'visible'
                  }}>
                    <div style={styles.cardHeader}>
                      <div style={styles.tagsContainer}>
                        <span style={{
                          ...styles.categoryTag,
                          backgroundColor: categoryColors.bg,
                          color: categoryColors.text
                        }}>
                          {currentCard.category}
                        </span>
                        <span 
                          style={{
                            ...styles.difficultyTag,
                            backgroundColor: getDifficultyColor(currentCard.difficulty)
                          }}
                        >
                          {currentCard.difficulty}
                        </span>
                      </div>
                      <button
                        onClick={toggleBookmark}
                        style={styles.bookmarkButton}
                      >
                        {isBookmarked ?
                          <RiBookmarkFill style={styles.bookmarkIconActive} /> :
                          <RiBookmarkLine style={styles.bookmarkIcon} />
                        }
                      </button>
                    </div>
                    <h3 style={styles.cardQuestion}>
                      {currentCard.question}
                    </h3>
                    <p style={styles.cardHint}>
                      Click to reveal answer
                    </p>
                  </div>

                  {/* Back of the card (Answer) */}
                  <div style={{
                    ...styles.cardSide,
                    transform: 'rotateY(180deg)',
                    visibility: isFlipped ? 'visible' : 'hidden'
                  }}>
                    <div style={styles.cardHeader}>
                      <div style={styles.tagsContainer}>
                        <span style={{
                          ...styles.categoryTag,
                          backgroundColor: categoryColors.bg,
                          color: categoryColors.text
                        }}>
                          {currentCard.category}
                        </span>
                        <span 
                          style={{
                            ...styles.difficultyTag,
                            backgroundColor: getDifficultyColor(currentCard.difficulty)
                          }}
                        >
                          {currentCard.difficulty}
                        </span>
                      </div>
                      <button
                        onClick={toggleBookmark}
                        style={styles.bookmarkButton}
                      >
                        {isBookmarked ?
                          <RiBookmarkFill style={styles.bookmarkIconActive} /> :
                          <RiBookmarkLine style={styles.bookmarkIcon} />
                        }
                      </button>
                    </div>
                    <div style={styles.cardAnswer}>
                      <p>{currentCard.answer}</p>
                    </div>
                    <p style={styles.cardHint}>
                      Click to see question
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div style={styles.noCardsMessage}>
                No flashcards found for the selected category.
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={filteredCards.length <= 1}
          style={styles.navButtonRight}
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Action Buttons */}
      <div style={styles.actionButtonsContainer}>
        <button
          onClick={handleFlip}
          disabled={!currentCard}
          style={styles.flipButton}
        >
          <FaRedo style={styles.actionIcon} />
          {isFlipped ? 'Show Question' : 'Show Answer'}
        </button>
        
        <button
          onClick={markAsMastered}
          disabled={!currentCard || isMastered}
          style={{
            ...styles.masterButton,
            opacity: isMastered ? 0.7 : 1,
            cursor: isMastered ? 'not-allowed' : 'pointer'
          }}
        >
          <IoMdFlash style={styles.actionIcon} />
          {isMastered ? 'Already Mastered' : 'I Know This!'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#F9FAFB',
    color: '#111827',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif"
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#F9FAFB',
    color: '#111827'
  },
  loadingContent: {
    textAlign: 'center',
    maxWidth: '500px'
  },
  loadingIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#EFF6FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px'
  },
  flashIcon: {
    color: '#3B82F6',
    fontSize: '32px'
  },
  loadingTitle: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#111827'
  },
  loadingText: {
    fontSize: '16px',
    color: '#6B7280',
    lineHeight: '1.5'
  },
  headerContainer: {
    width: '100%',
    maxWidth: '900px',
    marginBottom: '24px',
    textAlign: 'center'
  },
  headerLogo: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    backgroundColor: 'white',
    borderRadius: '50%',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    marginBottom: '16px'
  },
  headerFlashIcon: {
    color: '#F59E0B',
    fontSize: '32px',
    marginRight: '8px'
  },
  headerTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#111827',
    margin: '0'
  },
  headerSubtitle: {
    fontSize: '16px',
    color: '#6B7280',
    margin: '8px 0 0'
  },
  statsContainer: {
    width: '100%',
    maxWidth: '900px',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px'
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  statDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%'
  },
  statText: {
    fontSize: '14px',
    color: '#4B5563'
  },
  statBold: {
    fontWeight: '600'
  },
  controlsContainer: {
    width: '100%',
    maxWidth: '900px',
    marginBottom: '24px'
  },
  controlsInner: {
    display: 'flex',
    gap: '12px',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  categorySelect: {
    flex: '1',
    minWidth: '200px',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
    backgroundColor: 'white',
    color: '#111827',
    fontSize: '16px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  controlButton: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    outline: 'none'
  },
  controlIcon: {
    fontSize: '16px'
  },
  progressContainer: {
    width: '100%',
    maxWidth: '900px',
    marginBottom: '24px'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#E5E7EB',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '8px'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  progressText: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#6B7280'
  },
  flashcardWrapper: {
    width: '100%',
    maxWidth: '900px',
    marginBottom: '32px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  navButtonLeft: {
    position: 'absolute',
    left: '0',
    zIndex: '10',
    width: '48px',
    height: '48px',
    backgroundColor: '#3B82F6',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    outline: 'none'
  },
  navButtonRight: {
    position: 'absolute',
    right: '0',
    zIndex: '10',
    width: '48px',
    height: '48px',
    backgroundColor: '#3B82F6',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    outline: 'none'
  },
  flashcardContainer: {
    width: '100%',
    maxWidth: '700px',
    minHeight: '400px',
    position: 'relative',
    margin: '0 24px'
  },
  motionContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    perspective: '1000px'
  },
  flashcard: {
    width: '100%',
    minHeight: '400px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.6s, box-shadow 0.3s',
    position: 'relative',
    transformStyle: 'preserve-3d',
    backgroundColor: '#ffffff'
  },
  cardSide: {
    position: 'absolute',
    width: 'calc(100% - 48px)',
    height: 'calc(100% - 48px)',
    backfaceVisibility: 'hidden',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  tagsContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px'
  },
  categoryTag: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600'
  },
  difficultyTag: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    textTransform: 'capitalize'
  },
  bookmarkButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    transition: 'transform 0.2s',
    outline: 'none'
  },
  bookmarkIcon: {
    color: '#9CA3AF',
    fontSize: '24px'
  },
  bookmarkIconActive: {
    color: '#3B82F6',
    fontSize: '24px'
  },
  cardQuestion: {
    fontSize: '24px',
    color: '#111827',
    lineHeight: '1.6',
    textAlign: 'center',
    margin: '24px 0',
    flexGrow: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600'
  },
  cardAnswer: {
    fontSize: '18px',
    color: '#111827',
    lineHeight: '1.6',
    textAlign: 'left',
    margin: '24px 0',
    flexGrow: '1',
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px'
  },
  cardHint: {
    color: '#6B7280',
    fontSize: '14px',
    textAlign: 'center',
    fontStyle: 'italic'
  },
  noCardsMessage: {
    width: '100%',
    minHeight: '400px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6B7280',
    fontSize: '18px',
    textAlign: 'center',
    padding: '20px'
  },
  actionButtonsContainer: {
    display: 'flex',
    gap: '16px',
    width: '100%',
    maxWidth: '900px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '32px'
  },
  flipButton: {
    flex: '1',
    minWidth: '200px',
    backgroundColor: '#8B5CF6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '16px 24px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    outline: 'none'
  },
  masterButton: {
    flex: '1',
    minWidth: '200px',
    backgroundColor: '#10B981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '16px 24px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    outline: 'none'
  },
  actionIcon: {
    fontSize: '18px'
  },
  masteredMessage: {
    position: 'fixed',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    zIndex: 1000,
    maxWidth: '500px',
    width: '90%',
    borderLeft: '5px solid #10B981',
    textAlign: 'center'
  },
  masteredMessageContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px'
  },
  masteredMessageIcon: {
    color: '#F59E0B',
    fontSize: '48px',
    flexShrink: 0
  },
  masteredMessageTitle: {
    margin: '0 0 8px 0',
    color: '#111827',
    fontSize: '24px',
    fontWeight: '700'
  },
  masteredMessageText: {
    margin: '0',
    color: '#6B7280',
    fontSize: '18px',
    lineHeight: '1.5'
  }
};

export default FlashCard;