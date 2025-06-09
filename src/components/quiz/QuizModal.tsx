'use client';

import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { closeQuiz, selectAnswer, nextQuestion, previousQuestion, goToQuestion } from '@/store/slices/quizSlice';

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 1000;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  animation: ${props => props.isOpen ? 'fadeIn 0.3s ease-out' : 'none'};

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const QuizHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const ProgressInfo = styled.div`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s ease;

  &:hover {
    background: #f8f9fa;
    color: #333;
  }
`;

const QuizContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
`;

const QuestionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 3rem;
  color: #2c5530;
  font-family: 'TT Norms', Georgia, serif;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  width: 100%;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;

const OptionButton = styled.button<{ isSelected: boolean; isImageOption: boolean }>`
  padding: ${props => props.isImageOption ? '1rem' : '1.5rem'};
  border: 2px solid ${props => props.isSelected ? '#2c5530' : '#e9ecef'};
  background: ${props => props.isSelected ? '#f8f9fa' : 'white'};
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;
  border-radius: 8px;
  font-size: 1rem;
  min-height: ${props => props.isImageOption ? 'auto' : '60px'};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #2c5530;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(44, 85, 48, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
  padding-top: 2rem;
`;

const NavButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.875rem 2rem;
  border: ${props => props.variant === 'primary' ? 'none' : '2px solid #2c5530'};
  background: ${props => props.variant === 'primary' ? '#2c5530' : 'white'};
  color: ${props => props.variant === 'primary' ? 'white' : '#2c5530'};
  cursor: pointer;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${props => props.variant === 'primary' ? '#1a3319' : '#2c5530'};
    color: white;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #e9ecef;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: #2c5530;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const ResultContainer = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const ResultTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 500;
  margin-bottom: 2rem;
  color: #2c5530;
  font-family: 'TT Norms', Georgia, serif;
`;

const ResultText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 2rem;
`;

const RestartButton = styled(NavButton)`
  margin: 0 auto;
  display: block;
`;

export default function QuizModal() {
    const dispatch = useAppDispatch();
    const {
        isQuizOpen,
        quizData,
        currentQuestionIndex,
        answers,
        isComplete,
        hasRejection
    } = useAppSelector((state) => state.quiz);

    if (!quizData || !isQuizOpen) return null;

    const currentQuestion = quizData.questions[currentQuestionIndex];
    const currentAnswer = answers.find(a => a.questionIndex === currentQuestionIndex);
    const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

    const handleClose = () => {
        dispatch(closeQuiz());
    };

    const handleOptionSelect = (option: any) => {
        dispatch(selectAnswer(option));
    };

    const handlePrevious = () => {
        dispatch(previousQuestion());
    };

    const handleNext = () => {
        if (currentQuestionIndex === quizData.questions.length - 1) {
            // This is the last question, complete the quiz
            dispatch(nextQuestion());
        } else {
            dispatch(nextQuestion());
        }
    };

    const handleRestart = () => {
        dispatch(closeQuiz());
        // Small delay before opening again to reset state
        setTimeout(() => {
            // You might want to add a restart action to your slice
        }, 100);
    };

    if (isComplete) {
        const resultMessage = hasRejection
            ? "Unfortunately, we are unable to prescribe this medication for you. This is because finasteride can alter the PSA levels, which may be used to monitor for cancer. You should discuss this further with your GP or specialist if you would still like this medication."
            : "Great news! We have the perfect treatment for your hair loss. Proceed to www.manual.co, and prepare to say hello to your new hair!";

        return (
            <ModalOverlay isOpen={isQuizOpen}>
                <QuizHeader>
                    <div>Quiz Complete</div>
                    <CloseButton onClick={handleClose}>✕</CloseButton>
                </QuizHeader>

                <QuizContent>
                    <ResultContainer>
                        <ResultTitle>
                            {hasRejection ? "Not Eligible" : "Congratulations!"}
                        </ResultTitle>
                        <ResultText>{resultMessage}</ResultText>
                        <RestartButton variant="primary" onClick={handleClose}>
                            Back to Homepage
                        </RestartButton>
                    </ResultContainer>
                </QuizContent>
            </ModalOverlay>
        );
    }

    // Check if this question has image options
    const hasImageOptions = currentQuestion.options.some(option =>
        option.display.includes('<img') || option.display.includes('src=')
    );

    return (
        <ModalOverlay isOpen={isQuizOpen}>
            <QuizHeader>
                <ProgressInfo>
                    Question {currentQuestionIndex + 1} of {quizData.questions.length}
                </ProgressInfo>
                <CloseButton onClick={handleClose}>✕</CloseButton>
                <ProgressBar>
                    <ProgressFill progress={progress} />
                </ProgressBar>
            </QuizHeader>

            <QuizContent>
                <QuestionTitle>{currentQuestion.question}</QuestionTitle>

                <OptionsGrid>
                    {currentQuestion.options.map((option, index) => (
                        <OptionButton
                            key={index}
                            isSelected={currentAnswer?.selectedOption.value === option.value}
                            isImageOption={hasImageOptions}
                            onClick={() => handleOptionSelect(option)}
                        >
                            {hasImageOptions ? (
                                <div dangerouslySetInnerHTML={{ __html: option.display }} />
                            ) : (
                                option.display
                            )}
                        </OptionButton>
                    ))}
                </OptionsGrid>

                <NavigationButtons>
                    <NavButton
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        variant="secondary"
                    >
                        ← Previous
                    </NavButton>

                    <NavButton
                        onClick={handleNext}
                        disabled={!currentAnswer}
                        variant="primary"
                    >
                        {currentQuestionIndex === quizData.questions.length - 1 ? 'Complete Quiz' : 'Next →'}
                    </NavButton>
                </NavigationButtons>
            </QuizContent>
        </ModalOverlay>
    );
}