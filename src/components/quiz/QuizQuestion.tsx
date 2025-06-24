'use client';

import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import Button from "@/components/ui/Button";
import {nextQuestion, previousQuestion, selectAnswer} from "@/store/quiz/slice";
import { colors } from '@/constants/colors';


export default function QuizQuestion() {
    const dispatch = useAppDispatch();
    const {
        quizData,
        currentQuestionIndex,
        answers
    } = useAppSelector((state) => state.quiz);

    if (!quizData) return null;

    const currentQuestion = quizData.questions[currentQuestionIndex];
    const currentAnswer = answers.find(a => a.questionIndex === currentQuestionIndex);
    const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

    const handleOptionSelect = (option: any) => {
        dispatch(selectAnswer(option));
    };

    const handlePrevious = () => {
        dispatch(previousQuestion());
    };

    const handleNext = () => {
        dispatch(nextQuestion());
    };

    const hasImageOptions = currentQuestion.options.some(option =>
        option.display.includes('<img') || option.display.includes('src=')
    );

    return (
        <>
            <ProgressInfo>
                Question {currentQuestionIndex + 1} of {quizData.questions.length}
            </ProgressInfo>
            <ProgressBar 
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuenow={currentQuestionIndex + 1}
              aria-valuemin={1}
              aria-valuemax={quizData.questions.length}
            >
                <ProgressFill progress={progress} />
            </ProgressBar>

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
                    <Button
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        variant="outline"
                        icon="←"
                        iconPosition="left"
                    >
                        Previous
                    </Button>

                    <Button
                        onClick={handleNext}
                        disabled={!currentAnswer}
                        variant="success"
                        icon="→"
                        iconPosition="right"
                    >
                        Next
                    </Button>
                </NavigationButtons>
            </QuizContent>
        </>
    );
}

const ProgressInfo = styled.div`
  font-size: 0.9rem;
  color: ${colors.text.secondary};
  font-weight: 500;
  position: absolute;
  left: 2rem;
  top: 1.5rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: ${colors.border.light};
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: ${colors.primary.green};
  width: ${({ progress }) => progress}%;
  transition: width 0.3s ease;
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
  color: ${colors.primary.green};
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
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem;
    padding-top: 0.5rem;
    max-height: 60vh;
    overflow-y: auto;
    padding-bottom: 1rem;
  }
`;

const OptionButton = styled.button<{ isSelected: boolean; isImageOption: boolean }>`
  padding: ${({isImageOption}) => isImageOption ? '1rem' : '1.5rem'};
  border: 2px solid ${({isSelected}) => isSelected ? colors.primary.green : colors.border.light};
  background: ${props => props.isSelected ? colors.decorative.selected : colors.background.main};
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;
  border-radius: 8px;
  font-size: 1rem;
  min-height: ${({isImageOption}) => isImageOption ? 'auto' : '60px'};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${colors.primary.green};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${colors.decorative.shadow};
  }

  &:active {
    transform: translateY(0);
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;

    @media (max-width: 768px) {
      max-height: 80px;
      width: auto;
    }
  }

  @media (max-width: 768px) {
    padding: ${({isImageOption}) => isImageOption ? '0.5rem' : '1rem'};
    min-height: ${({isImageOption}) => isImageOption ? '100px' : '50px'};
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
  padding-top: 2rem;

  @media (max-width: 768px) {
    position: sticky;
    bottom: 0;
    background: ${colors.background.main};
    padding: 1rem 0;
    border-top: 1px solid ${colors.border.light};
    margin-top: 1rem;
  }
`;