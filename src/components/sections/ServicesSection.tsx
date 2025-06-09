'use client';

import styled from '@emotion/styled';

const ServicesContainer = styled.section`
  padding: 6rem 0;
  background: white;
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
  margin-bottom: 4rem;
  color: #2c5530;
  font-family: 'TT Norms', Georgia, serif;
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
  flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
`;

const BackgroundNumber = styled.div<{ number: string }>`
  position: absolute;
  font-size: 12rem;
  font-weight: 700;
  color: rgba(168, 197, 160, 0.15);
  background: #F3F7F4;
  z-index: 0;
  top: -2rem;
  left: ${props => props.number === '01' ? '19rem' : 'auto'};
  right: ${props => props.number === '02' ? '-2rem' : 'auto'};
  user-select: none;
  pointer-events: none;
  font-family: 'TT Norms', Georgia, serif;
  font-weight: 400;
  font-size: 450px;
  line-height: 450px;
  letter-spacing: -3%;


  @media (max-width: 768px) {
    font-size: 8rem;
    position: relative;
    left: auto;
    right: auto;
    top: 0;
    margin-bottom: 1rem;
  }
`;

const ServiceImage = styled.div<{ imageType?: 'hairloss' | 'ed' }>`
  width: 200px;
  height: 200px;
  background-image: ${({ imageType }) => {
    if (imageType === 'hairloss') {
      return `url('/images/hair-loss-back-head.png')`;
    } else if (imageType === 'ed') {
      return `url('/images/older-man.png')`;
    }
    return 'none';
  }};
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
  border-radius: 4px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    width: 250px;
    height: 180px;
  }
`;

const ServiceContent = styled.div`
  flex: 1;
  max-width: 300px;
  position: relative;
  z-index: 1;
`;

const ServiceCategory = styled.div`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #666;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const ServiceTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #2c5530;
  line-height: 1.3;
  font-family: 'TT Norms', Georgia, serif;
`;

const ServiceDescription = styled.p`
  line-height: 1.6;
  color: #666;
  font-size: 0.95rem;
`;

export default function ServicesSection() {
    return (
        <ServicesContainer>
            <ContentWrapper>
                <SectionTitle>What we can help with</SectionTitle>

                <ServicesGrid>

                    <ServiceCard>
                        <BackgroundNumber number="01">01</BackgroundNumber>
                        <ServiceImage imageType="hairloss" />
                        <ServiceContent>
                            <ServiceCategory>Hair Loss</ServiceCategory>
                            <ServiceTitle>Hair loss needn't be irreversible. We can help!</ServiceTitle>
                            <ServiceDescription>
                                We're working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out.
                            </ServiceDescription>
                        </ServiceContent>
                    </ServiceCard>

                    <ServiceCard reverse>
                        <BackgroundNumber number="02">02</BackgroundNumber>
                        <ServiceImage imageType="ed" />
                        <ServiceContent>
                            <ServiceCategory>Erectile Dysfunction</ServiceCategory>
                            <ServiceTitle>Erections can be a tricky thing. But no need to feel down!</ServiceTitle>
                            <ServiceDescription>
                                We're working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out.
                            </ServiceDescription>
                        </ServiceContent>
                    </ServiceCard>
                </ServicesGrid>
            </ContentWrapper>
        </ServicesContainer>
    );
}