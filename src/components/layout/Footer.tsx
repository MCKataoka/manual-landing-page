'use client';

import styled from '@emotion/styled';
import { colors } from '@/constants/colors';

export default function Footer() {
    return (
        <FooterContainer>
            <ContentWrapper>
                <FooterGrid>
                    <Logo src="/images/manual-logo-large.png" alt="Manual" />

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
                            <FacebookIcon href="#" aria-label="Facebook" />
                            <GoogleIcon href="#" aria-label="Google" />
                            <TwitterIcon href="#" aria-label="Twitter" />
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

const FooterContainer = styled.footer`
  background: ${colors.background.footer};
  padding: 4rem 2rem 2rem;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  gap: 4rem;
  align-items: start;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0;
    text-align: left;
  }
`;

const Logo = styled.img`
  height: 70px;
  width: auto;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const FooterColumn = styled.div`
  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

const ColumnTitle = styled.h4`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 2rem;
  color: ${colors.text.primary};

  @media (max-width: 768px) {
    padding: 1rem;
    margin-bottom: 0;
    border-bottom: 1px solid ${colors.border.medium};
    width: 100%;
  }
`;

const FooterLink = styled.a`
  display: block;
  color: ${colors.text.primary};
  text-decoration: none;
  margin-bottom: 2rem;
  font-size: 16px;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.primary.green};
  }

  @media (max-width: 768px) {
    padding: 1rem;
    margin-bottom: 0;
    width: 100%;

    &:hover {
      background: ${colors.decorative.linkHover};
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    align-items: flex-start;
    padding-bottom: 2rem;
    margin-bottom: 0;
  }
`;

const SocialIconsRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    padding-left: 1rem;
  }
`;

const SocialIcon = styled.a`
  width: 24px;
  height: 24px;
  background: ${colors.transparent};
  color: ${colors.primary.red};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 1.2rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: ${colors.hover.redLight};
    transform: translateY(-2px);
  }

  &::before {
    font-family: "Font Awesome 6 Brands";
    font-weight: 900;
  }
`;

const FacebookIcon = styled(SocialIcon)`
  &::before {
    content: "\\f39e"; /* Facebook-f unicode */
  }
`;

const GoogleIcon = styled(SocialIcon)`
  &::before {
    content: "\\f1a0"; /* Google unicode */
  }
`;

const TwitterIcon = styled(SocialIcon)`
  &::before {
    content: "\\f099"; /* Twitter unicode */
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid ${colors.border.medium};
  color: ${colors.text.muted};
  font-size: 16px;
  font-weight: 400;

  @media (max-width: 768px) {
    border-top: none;
  }
`;