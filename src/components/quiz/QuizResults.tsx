'use client';

import styled from '@emotion/styled';
import { useAppSelector } from '@/hooks/redux';
import Button from "@/components/ui/Button";
import { colors } from '@/constants/colors';

interface QuizResultsProps {
    onClose: () => void;
}

export default function QuizResults({ onClose }: QuizResultsProps) {
    const { hasRejection } = useAppSelector((state) => state.quiz);

    const resultMessage = hasRejection
        ? "Unfortunately, we are unable to prescribe this medication for you. This is because finasteride can alter the PSA levels, which may be used to monitor for cancer. You should discuss this further with your GP or specialist if you would still like this medication."
        : (
            <>
                Great news! We have the perfect treatment for your hair loss. Proceed to{" "}
                <StyledLink href="https://www.manual.co" target="_blank" rel="noopener noreferrer">
                    www.manual.co
                </StyledLink>
                , and prepare to say hello to your new hair!
            </>
        );

    return (
        <QuizContent>
            <ResultContainer>
                <ResultTitle>
                    {hasRejection ? "Not Eligible" : "Congratulations!"}
                </ResultTitle>
                <ResultText>{resultMessage}</ResultText>
                <Button variant="success" onClick={onClose}>
                    Back to Homepage
                </Button>
            </ResultContainer>
        </QuizContent>
    );
}

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

const ResultContainer = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const ResultTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 500;
  margin-bottom: 2rem;
  color: ${colors.primary.green};
`;

const ResultText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${colors.text.secondary};
  margin-bottom: 2rem;
`;

const StyledLink = styled.a`
  color: ${colors.text.primary};
`;