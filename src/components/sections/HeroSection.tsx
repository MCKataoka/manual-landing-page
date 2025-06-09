'use client';

import styled from '@emotion/styled';
import { useAppDispatch } from '@/hooks/redux';
import { openQuiz, fetchQuizData } from '@/store/slices/quizSlice';
import { useEffect } from 'react';

const HeroContainer = styled.section`
  height: 100vh;
  background: #a6c2a0;
  display: flex;
  position: relative;
  overflow: hidden;
`;

// Decorative M logo in top-left
const LogoDecorative = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  font-size: 1.5rem;
  font-weight: 300;
  color: #2c5530;
  font-style: italic;
  z-index: 10;
`;

// Small circular element in bottom-left
const CircleDecorative = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  width: 40px;
  height: 40px;
  background: #2c5530;
  border-radius: 50%;
  z-index: 10;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100%;
`;

const TextContent = styled.div`
  padding: 0 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #2c5530;
  background-image: url('/images/hero-man-laughing.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
`;

const Heading = styled.h1`
  font-size: 4.5rem;
  font-weight: 500;
  line-height: 0.9;
  margin-bottom: 2rem;
  font-family: 'TT Norms', Georgia, serif;
  color: #2c5530;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtext = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 400px;
  color: #2c5530;
`;

const CTAButton = styled.button`
  background: #a42538;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background 0.3s ease;
  align-self: flex-start;

  &:hover {
    background: #8b1f30;
  }
`;

const ImageSection = styled.div`
  background-image: url('/images/hero-man-laughing.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
`;

const HeaderContainer = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 2rem;
  background: transparent;
`;

const Logo = styled.img`
  height: 32px;
  width: auto;
`;

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
                <HeaderContainer>
                    <Logo src="/images/manual-logo.png" alt="Manual" />
                </HeaderContainer>
                <TextContent>
                    <Heading>
                        Be good<br />
                        to yourself
                    </Heading>
                    <Subtext>
                        We're working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out.
                    </Subtext>
                    <CTAButton onClick={handleTakeQuiz}>
                        Take the quiz
                    </CTAButton>
                </TextContent>


            </ContentGrid>
        </HeroContainer>
    );
}