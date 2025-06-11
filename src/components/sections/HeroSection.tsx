'use client';

import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { openQuiz } from '@/store/quiz/slice';
import { useEffect } from 'react';
import Button from "@/components/ui/Button";
import { fetchQuizData } from "@/store/quiz/actions";
import { colors } from '@/constants/colors';

export default function HeroSection() {
    const dispatch = useAppDispatch();
    const { error, isLoading, quizData } = useAppSelector((state) => state.quiz);

    useEffect(() => {
        dispatch(fetchQuizData());
    }, [dispatch]);

    const handleTakeQuiz = () => {
        if (error || !quizData) {
            // If there's an error or no data, retry fetching
            dispatch(fetchQuizData());
        } else {
            dispatch(openQuiz());
        }
    };

    return (
        <HeroContainer>
            <ContentGrid>
                <TextContent>
                    <Heading>
                        Be good<br />
                        to yourself
                    </Heading>
                    <Subtext>
                        We're working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out.
                    </Subtext>

                    {error && (
                        <ErrorMessage>
                            Unable to load quiz questions. Please try again.
                        </ErrorMessage>
                    )}

                    <Button
                        variant="primary"
                        size="large"
                        onClick={handleTakeQuiz}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : error ? 'Try Again' : 'Take the quiz'}
                    </Button>
                </TextContent>
            </ContentGrid>
        </HeroContainer>
    );
}

const HeroContainer = styled.section`
  max-height: 750px;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const ContentGrid = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
`;

const TextContent = styled.div`
  padding: 0 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${colors.primary.green};
  background-image: url('/images/hero-man-laughing.jpg');
  background-size: cover;
  background-position: center;
  position: relative;

  @media (max-width: 768px) {
    font-size: 3rem;
    background-image: none;
    background-color: ${colors.background.mobileHero};
    align-items: center;
    padding: 0 3rem;
  }
`;

const Heading = styled.h1`
  font-size: 4.5rem;
  font-weight: 500;
  line-height: 0.9;
  margin-bottom: 1.5rem;
  color: ${colors.text.primary};

  @media (max-width: 768px) {
    font-size: 3rem;
    text-align: center;
  }
`;

const Subtext = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 400px;
  color: ${colors.text.primary};

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const ErrorMessage = styled.p`
  font-size: 0.9rem;
  color: ${colors.primary.red};
  background: ${colors.background.main};
  padding: 0.75rem 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  max-width: 400px;
  border-left: 3px solid ${colors.primary.red};

  @media (max-width: 768px) {
    text-align: center;
    margin: 0 auto 1rem;
  }
`;