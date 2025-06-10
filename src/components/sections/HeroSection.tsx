'use client';

import styled from '@emotion/styled';
import { useAppDispatch } from '@/hooks/redux';
import { openQuiz, fetchQuizData } from '@/store/slices/quizSlice';
import { useEffect } from 'react';
import Button from "@/components/ui/Button";


export default function HeroSection() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchQuizData());
    }, [dispatch]);

    const handleTakeQuiz = () => {
        dispatch(openQuiz());
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
                    <Button variant="primary" size="large" onClick={handleTakeQuiz}>
                        Take the quiz
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
  color: #2c5530;
  background-image: url('/images/hero-man-laughing.jpg');
  background-size: cover;
  background-position: center;
  position: relative;

  @media (max-width: 768px) {
    font-size: 3rem;
    background-image: none;
    background-color: #a1b89e;
    align-items: center;
    padding: 0 3rem;
  }
`;

const Heading = styled.h1`
  font-size: 4.5rem;
  font-weight: 500;
  line-height: 0.9;
  margin-bottom: 1.5rem;
  
  color: #0B3B3C;

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
  color: #0B3B3C;
  @media (max-width: 768px) {
    text-align: center;
  }
`;
