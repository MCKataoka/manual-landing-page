'use client';

import styled from '@emotion/styled';
import { ButtonHTMLAttributes, ReactNode } from 'react';

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
          background: #7E0707;
          color: white;
          border: 2px solid #7E0707;
  
          &:hover:not(:disabled) {
            background: #8b1f30;
            border-color: #8b1f30;
            transform: translateY(-1px);
          }
        `;
      case 'secondary':
        return `
          background: #2c5530;
          color: white;
          border: 2px solid #2c5530;
          
          &:hover:not(:disabled) {
            background: #1a3319;
            border-color: #1a3319;
            transform: translateY(-1px);
          }
        `;
      case 'success':
        return `
          background: #0B3B3C;
          color: white;
          border: 2px solid #0B3B3C;
          border-radius: 4px;
          
          &:hover:not(:disabled) {
            background: #083031;
            border-color: #083031;
            transform: translateY(-1px);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: #2c5530;
          border: 2px solid #0B3B3C;
          border-radius: 4px;
          
          &:hover:not(:disabled) {
            background: #0B3B3C;
            color: white;
            transform: translateY(-1px);
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: #2c5530;
          border: 2px solid transparent;
          
          &:hover:not(:disabled) {
            background: rgba(44, 85, 48, 0.1);
            transform: translateY(-1px);
          }
        `;
      default:
        return `
          background: #7E0707;
          color: white;
          border: 2px solid #7E0707;
          
          &:hover:not(:disabled) {
            background: #8b1f30;
            border-color: #8b1f30;
            transform: translateY(-1px);
          }
        `;
    }
  }}

  ${({ iconPosition }) => iconPosition === 'right' && `
    flex-direction: row-reverse;
  `}
`;