'use client';

import styled from '@emotion/styled';
import { colors } from '@/constants/colors';

export default function Header() {
    return (
        <HeaderContainer>
            <Logo src="/images/manual-logo.png" alt="Manual" />
        </HeaderContainer>
    );
}

const HeaderContainer = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 2rem 6rem;
  background: ${colors.transparent};

  @media (max-width: 768px) {
    align-self: center;
    display: flex;
    justify-content: center;
  }
`;

const Logo = styled.img`
  height: 32px;
  width: auto;
  cursor: pointer;
`;