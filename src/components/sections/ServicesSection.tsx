'use client';

import styled from '@emotion/styled';
import {services} from "@/data/services";
import { colors } from '@/constants/colors';

export default function ServicesSection() {
    return (
        <ServicesContainer>
            <ContentWrapper>
                <SectionTitle>What we can help with</SectionTitle>

                <ServicesGrid>
                    {services.map((service, index) => {
                        const isReverse = index % 2 !== 0;
                        const serviceNumber = String(index + 1).padStart(2, '0');

                        return (
                            <ServiceCard key={service.id} reverse={isReverse}>
                                <ServiceImage backgroundImage={service.image} />
                                <ServiceContentWrapper>
                                    <BackgroundNumber reverse={isReverse}>
                                        {serviceNumber}
                                    </BackgroundNumber>
                                    <ServiceContent reverse={isReverse}>
                                        <ServiceCategory>{service.category}</ServiceCategory>
                                        <ServiceTitle>{service.title}</ServiceTitle>
                                        <ServiceDescription>{service.description}</ServiceDescription>
                                    </ServiceContent>
                                </ServiceContentWrapper>
                            </ServiceCard>
                        );
                    })}
                </ServicesGrid>
            </ContentWrapper>
        </ServicesContainer>
    );
}

const ServicesContainer = styled.section`
  padding: 6rem 0;
  background: ${colors.background.main};
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 5rem;
  color: ${colors.primary.green};
`;

const ServicesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;

  @media (max-width: 968px) {
    gap: 4rem;
  }
`;

const ServiceCard = styled.div<{ reverse?: boolean }>`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  flex-direction: ${({ reverse }) => reverse ? 'row-reverse' : 'row'};
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 2rem;
  }
`;

const ServiceContentWrapper = styled.div`
  position: relative;
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 400px;
  }
`;

const BackgroundNumber = styled.div<{ reverse?: boolean }>`
  position: absolute;
  font-size: 450px;
  font-weight: 700;
  color: ${colors.decorative.numbers};
  z-index: 0;
  top: -2rem;
  left: ${({ reverse }) => reverse ? '-5rem' : 'auto'};
  right: ${({ reverse }) => reverse ? 'auto' : '1rem'};
  user-select: none;
  pointer-events: none;

  @media (max-width: 768px) {
    font-size: 16rem;
    top: -1rem;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }
`;

const ServiceImage = styled.div<{ backgroundImage: string }>`
  width: 370px;
  height: 475px;
  background-image: url('${({ backgroundImage }) => backgroundImage}');
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 350px;
    height: 280px;
    order: -1;
  }
`;

const ServiceContent = styled.div<{ reverse?: boolean }>`
  width: 391px;
  position: relative;
  z-index: 1;
  padding: ${({ reverse }) => reverse ? '8rem 0 0' : '8rem 0 0 4rem'};

  @media (max-width: 768px) {
    width: 100%;
    padding: 2rem 1rem;
    text-align: center;
  }
`;

const ServiceCategory = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${colors.text.muted};
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const ServiceTitle = styled.h3`
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 2rem;
  color: ${colors.text.primary};
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 1.5rem;
  }
`;

const ServiceDescription = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: ${colors.text.primary};

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;