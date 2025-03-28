import React, { useState, useEffect } from 'react';
import { theme } from './theme';

interface Question {
  text: string;
  type: 'scale' | 'text';
  leftEmoji?: string;
  rightEmoji?: string;
  leftLabel?: string;
  rightLabel?: string;
}

interface SurveyResults {
  riskTolerance: number;
  investmentHorizon: number;
  initialInvestment: number;
}

const questions: Question[] = [
  { 
    text: 'What is your risk tolerance?', 
    type: 'scale',
    leftEmoji: '',
    rightEmoji: '',
    leftLabel: 'Conservative',
    rightLabel: 'Aggressive'
  },
  { 
    text: 'What is your investment horizon?', 
    type: 'scale',
    leftEmoji: '',
    rightEmoji: '',
    leftLabel: 'Short-term',
    rightLabel: 'Long-term'
  },
  { text: 'Initial investment amount? ', type: 'text' },
];

const Profiler: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);
  const [answers, setAnswers] = useState<(number | string | null)[]>(
    Array(questions.length).fill(null)
  );

  // Reset and trigger animation when component mounts
  useEffect(() => {
    setContentVisible(false); // Ensure it starts invisible
    const timer = requestAnimationFrame(() => {
      setContentVisible(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []); // Only run on mount

  const handleScaleSelect = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = event.target.value;
    setAnswers(newAnswers);
  };

  const processSurveyResults = (): SurveyResults => {
    const [riskTolerance, investmentHorizon, initialInvestmentStr] = answers;
    
    return {
      riskTolerance: riskTolerance as number,
      investmentHorizon: investmentHorizon as number,
      initialInvestment: parseInt((initialInvestmentStr as string).replace(/\D/g, '')) || 0
    };
  };

  const handleNext = () => {
    setContentVisible(false);
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        requestAnimationFrame(() => {
          setContentVisible(true);
        });
      } else {
        // Process results when survey is complete
        const results = processSurveyResults();
        
        // Log results (you can remove this later)
        console.log('Survey Results:', {
          'Risk Tolerance (1-7)': results.riskTolerance,
          'Investment Horizon (1-7)': results.investmentHorizon,
          'Initial Investment': formatCurrency(results.initialInvestment)
        });

        // Here you can add code to send results to a backend or parent component
        // For example: onSurveyComplete(results);
        
        alert(`Survey complete! 
          Risk Tolerance: ${results.riskTolerance}/7
          Investment Horizon: ${results.investmentHorizon}/7
          Initial Investment: ${formatCurrency(results.initialInvestment)}`);
      }
    }, 650);
  };

  const canProceed = () => {
    const answer = answers[currentQuestionIndex];
    if (questions[currentQuestionIndex].type === 'scale') {
      return typeof answer === 'number';
    } else {
      return typeof answer === 'string' && answer.trim() !== '';
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderScaleQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '4.25rem' }}>{currentQuestion.leftEmoji}</span>
            <span style={{ 
              fontSize: '2rem', 
              color: '#2196F3',
              fontFamily: theme.typography.fontFamily,
              whiteSpace: 'nowrap',
            }}>
              {currentQuestion.leftLabel}
            </span>
          </div>
          <div style={{ 
            display: 'flex', 
            gap: '1.5rem', 
            justifyContent: 'center',
            alignItems: 'center',
            height: '160px'
          }}>
            {Array.from({ length: 7 }, (_, i) => i + 1).map((value) => {
              const isSelected = answers[currentQuestionIndex] === value;
              let backgroundColor = 'transparent';
              let borderColor;
              
              // Calculate size based on position with more dramatic progression
              let size;
              if (value === 1 || value === 7) {
                size = 150; // Largest
              } else if (value === 2 || value === 6) {
                size = 130; // Second largest
              } else if (value === 3 || value === 5) {
                size = 110; // Medium
              } else {
                size = 85; // Smallest (center)
              }
              
              if (value < 4) {
                // Blue (left side)
                borderColor = '#2196F3';
              } else if (value === 4) {
                // Gray (center)
                borderColor = '#9E9E9E';
              } else {
                // Green (right side)
                borderColor = '#4CAF50';
              }

              return (
                <div
                  key={value}
                  onClick={() => handleScaleSelect(value)}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '4.5px solid',
                    borderColor: borderColor,
                    backgroundColor: isSelected ? borderColor : backgroundColor,
                    fontSize: '1rem',
                    userSelect: 'none',
                    transition: 'all 0.3s ease',
                    transform: 'scale(1)',
                    margin: '0 10px',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(46, 125, 50, 0.4)';
                    e.currentTarget.style.backgroundColor = borderColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '4.25rem' }}>{currentQuestion.rightEmoji}</span>
            <span style={{ 
              fontSize: '2rem', 
              color: '#4CAF50',
              fontFamily: theme.typography.fontFamily,
              whiteSpace: 'nowrap',
            }}>
              {currentQuestion.rightLabel}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderTextQuestion = () => {
    const formatValue = (value: string) => {
      // Remove all non-digits
      const numbers = value.replace(/\D/g, '');
      // Convert to number and format with commas
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Number(numbers) || 0);
      return formatted;
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // Store raw number value but display formatted
      const rawValue = event.target.value.replace(/[^0-9]/g, '');
      handleTextChange({ ...event, target: { ...event.target, value: rawValue } });
    };

    return (
      <div style={{ 
        marginTop: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{
          position: 'relative',
          width: '300px',
        }}>
          <input
            type="text"
            value={answers[currentQuestionIndex] ? formatValue(answers[currentQuestionIndex] as string) : ''}
            onChange={handleAmountChange}
            placeholder="$0"
            style={{
              fontSize: '2rem',
              padding: '1rem',
              width: '100%',
              textAlign: 'center',
              border: '2px solid #4CAF50',
              borderRadius: '12px',
              outline: 'none',
              backgroundColor: 'white',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(76, 175, 80, 0.1)',
              fontFamily: theme.typography.fontFamily,
              color: '#2C3E50',
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.2)';
              e.target.style.borderColor = '#45a049';
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = '0 2px 8px rgba(76, 175, 80, 0.1)';
              e.target.style.borderColor = '#4CAF50';
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: '-1.5rem',
            left: '0',
            right: '0',
            textAlign: 'center',
            fontSize: '0.9rem',
            color: '#666',
            fontFamily: theme.typography.fontFamily,
          }}>
            Enter your initial investment amount
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.colors.background.gradient,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '1200px',
        width: '90%',
        padding: '2rem',
      }}>
        {currentQuestionIndex === 0 && (
          <p style={{ 
            fontSize: '1.5rem',
            marginBottom: '4rem',
            color: theme.colors.primary.main,
            fontFamily: theme.typography.fontFamily,
          }}>
            Let's tailor your portfolio to your needs!
          </p>
        )}

        <div style={{
          opacity: contentVisible ? 1 : 0,
          transform: `translateY(${contentVisible ? '0' : '20px'})`,
          transition: 'all 0.65s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}>
          <p style={{ 
            fontSize: '3.5rem',
            marginBottom: '3rem',
            fontFamily: theme.typography.fontFamily,
            textAlign: 'center',
            color: theme.colors.text.primary,
          }}>
            {questions[currentQuestionIndex].text}
          </p>

          {questions[currentQuestionIndex].type === 'scale'
            ? renderScaleQuestion()
            : renderTextQuestion()}

          <button
            onClick={handleNext}
            style={{
              marginTop: '4rem',
              padding: '1rem 2.5rem',
              cursor: 'pointer',
              fontSize: '1.2rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: theme.colors.primary.main,
              color: theme.colors.text.primary,
              fontFamily: theme.typography.fontFamily,
              fontWeight: '500',
              boxShadow: '0 4px 6px rgba(152, 216, 170, 0.2)',
              transition: 'all 0.3s ease',
              opacity: canProceed() ? '1' : '0.6',
            }}
            
            disabled={!canProceed()}
            onMouseEnter={(e) => {
              if (canProceed()) {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(152, 216, 170, 0.3)';
                e.currentTarget.style.backgroundColor = theme.colors.primary.dark;
              }
            }}
            onMouseLeave={(e) => {
              if (canProceed()) {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(152, 216, 170, 0.2)';
                e.currentTarget.style.backgroundColor = theme.colors.primary.main;
              }
            }}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profiler;
