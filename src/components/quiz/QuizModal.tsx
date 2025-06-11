'use client';

import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';
import { closeQuiz } from "@/store/quiz/slice";
import { colors } from '@/constants/colors';

export default function QuizModal() {
    const dispatch = useAppDispatch();
    const { isQuizOpen, quizData, isComplete } = useAppSelector((state) => state.quiz);

    if (!quizData || !isQuizOpen) return null;

    const handleClose = () => {
        dispatch(closeQuiz());
    };

    return (
        <ModalOverlay isOpen={isQuizOpen}>
            <QuizHeader>
                <div>{isComplete ? 'Quiz Complete' : `Question ${quizData.questions.length > 0 ? '...' : ''}`}</div>
                <CloseButton onClick={handleClose}>✕</CloseButton>
            </QuizHeader>

            {isComplete ? (
                <QuizResults onClose={handleClose} />
            ) : (
                <QuizQuestion onClose={handleClose} />
            )}
        </ModalOverlay>
    );
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${colors.background.main};
  z-index: 1000;
  display: ${({ isOpen }) => isOpen ? 'flex' : 'none'};
  flex-direction: column;
  animation: ${props => props.isOpen ? 'fadeIn 0.3s ease-out' : 'none'};

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const QuizHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${colors.border.light};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${colors.background.main};
  position: sticky;
  top: 0;
  z-index: 10;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${colors.text.secondary};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s ease;

  &:hover {
    background: ${colors.background.light};
    color: ${colors.text.dark};
  }
`;