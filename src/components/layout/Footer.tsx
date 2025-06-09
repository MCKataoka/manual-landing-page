'use client';

import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  background: #f8f9fa;
  padding: 4rem 2rem 2rem;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr 1fr auto;
  gap: 4rem;
  align-items: start;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const Logo = styled.img`
  height: 32px;
  width: auto;
`;

const FooterColumn = styled.div``;

const ColumnTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  color: #2c5530;
`;

const FooterLink = styled.a`
  display: block;
  color: #666;
  text-decoration: none;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;

  &:hover {
    color: #2c5530;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const SocialIconsRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  background: #2c5530;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: bold;
  border-radius: 4px;
  transition: background 0.2s ease;

  &:hover {
    background: #1a3319;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
  color: #666;
  font-size: 0.8rem;
`;

export default function Footer() {
    return (
        <FooterContainer>
            <ContentWrapper>
                <FooterGrid>
                    <Logo src="/images/manual-logo.png" alt="Manual" />

                    <FooterColumn>
                        <ColumnTitle>Product</ColumnTitle>
                        <FooterLink href="#">Popular</FooterLink>
                        <FooterLink href="#">Trending</FooterLink>
                        <FooterLink href="#">Guided</FooterLink>
                        <FooterLink href="#">Products</FooterLink>
                    </FooterColumn>

                    <FooterColumn>
                        <ColumnTitle>Company</ColumnTitle>
                        <FooterLink href="#">Press</FooterLink>
                        <FooterLink href="#">Mission</FooterLink>
                        <FooterLink href="#">Strategy</FooterLink>
                        <FooterLink href="#">About</FooterLink>
                    </FooterColumn>

                    <FooterColumn>
                        <ColumnTitle>Info</ColumnTitle>
                        <FooterLink href="#">Support</FooterLink>
                        <FooterLink href="#">Customer Service</FooterLink>
                        <FooterLink href="#">Get started</FooterLink>
                    </FooterColumn>

                    <SocialLinks>
                        <ColumnTitle>Follow Us</ColumnTitle>
                        <SocialIconsRow>
                            <SocialIcon href="#" aria-label="Facebook">F</SocialIcon>
                            <SocialIcon href="#" aria-label="Google">G</SocialIcon>
                            <SocialIcon href="#" aria-label="Twitter">T</SocialIcon>
                        </SocialIconsRow>
                    </SocialLinks>
                </FooterGrid>

                <Copyright>
                    © 2021 Manual. All rights reserved.
                </Copyright>
            </ContentWrapper>
        </FooterContainer>
    );
}