'use client';

import styled from '@emotion/styled';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { colors } from '@/constants/colors';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    children: ReactNode;
}

export default function Button({
                                   variant = 'primary',
                                   size = 'medium',
                                   fullWidth = false,
                                   icon,
                                   iconPosition = 'left',
                                   disabled,
                                   children,
                                   ...props
                               }: ButtonProps) {
    return (
        <StyledButton
            variant={variant}
            size={size}
            fullWidth={fullWidth}
            iconPosition={iconPosition}
            disabled={disabled}
            {...props}
        >
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
        </StyledButton>
    );
}

const StyledButton = styled.button<ButtonProps>`
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.2s ease;
  font-family: inherit;
  text-decoration: none;
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  display: ${({ fullWidth }) => fullWidth ? 'flex' : 'inline-flex'};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
          width: 78px;
        `;
      case 'large':
        return `
          padding: 1.25rem 2.5rem;
          font-size: 1rem;
          width: 284px;
        `;
      default:
        return `
          padding: 0.875rem 2rem;
          font-size: 0.8rem;
          width: 156px;
        `;
    }
  }}

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return `
          background: ${colors.primary.red};
          color: ${colors.text.white};
          border: 2px solid ${colors.primary.red};
  
          &:hover:not(:disabled) {
            background: ${colors.hover.red};
            border-color: ${colors.hover.red};
            transform: translateY(-1px);
          }
        `;
      case 'secondary':
        return `
          background: ${colors.primary.green};
          color: ${colors.text.white};
          border: 2px solid ${colors.primary.green};
          
          &:hover:not(:disabled) {
            background: ${colors.hover.green};
            border-color: ${colors.hover.green};
            transform: translateY(-1px);
          }
        `;
      case 'success':
        return `
          background: ${colors.primary.teal};
          color: ${colors.text.white};
          border: 2px solid ${colors.primary.teal};
          border-radius: 4px;
          
          &:hover:not(:disabled) {
            background: ${colors.hover.teal};
            border-color: ${colors.hover.teal};
            transform: translateY(-1px);
          }
        `;
      case 'outline':
        return `
          background: ${colors.transparent};
          color: ${colors.primary.green};
          border: 2px solid ${colors.primary.teal};
          border-radius: 4px;
          
          &:hover:not(:disabled) {
            background: ${colors.primary.teal};
            color: ${colors.text.white};
            transform: translateY(-1px);
          }
        `;
      case 'ghost':
        return `
          background: ${colors.transparent};
          color: ${colors.primary.green};
          border: 2px solid ${colors.transparent};
          
          &:hover:not(:disabled) {
            background: ${colors.decorative.ghostHover};
            transform: translateY(-1px);
          }
        `;
      default:
        return `
          background: ${colors.primary.red};
          color: ${colors.text.white};
          border: 2px solid ${colors.primary.red};
          
          &:hover:not(:disabled) {
            background: ${colors.hover.red};
            border-color: ${colors.hover.red};
            transform: translateY(-1px);
          }
        `;
    }
  }}

  ${({ iconPosition }) => iconPosition === 'right' && `
    flex-direction: row-reverse;
  `}
`;