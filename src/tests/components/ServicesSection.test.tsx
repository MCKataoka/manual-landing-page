import { render, screen } from '@testing-library/react';
import ServicesSection from '@/components/sections/ServicesSection';

jest.mock('@/data/services', () => ({
    services: [
        {
            id: 'hairloss',
            category: 'Hair Loss',
            title: 'Hair loss needn\'t be irreversible. We can help!',
            description: 'We\'re working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out.',
            image: '/images/hair-loss-back-head.png'
        },
        {
            id: 'ed',
            category: 'Erectile Dysfunction',
            title: 'Erections can be a tricky thing. But no need to feel down!',
            description: 'We\'re working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out.',
            image: '/images/older-man.png'
        }
    ]
}));

describe('ServicesSection Component', () => {

    describe('Service Rendering', () => {
        it('renders all services from data', () => {
            render(<ServicesSection />);

            expect(screen.getByText('Hair loss needn\'t be irreversible. We can help!')).toBeInTheDocument();
            expect(screen.getByText('Erections can be a tricky thing. But no need to feel down!')).toBeInTheDocument();
        });

        it('renders all service categories', () => {
            render(<ServicesSection />);

            expect(screen.getByText('Hair Loss')).toBeInTheDocument();
            expect(screen.getByText('Erectile Dysfunction')).toBeInTheDocument();
        });

        it('renders all service descriptions', () => {
            render(<ServicesSection />);

            // Both services have the same description, so should appear twice
            expect(screen.getAllByText(/We're working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out./)).toHaveLength(2);
        });
    });

    describe('Service Structure', () => {
        it('renders each service with all required elements', () => {
            render(<ServicesSection />);

            const services = [
                {
                    category: 'Hair Loss',
                    title: 'Hair loss needn\'t be irreversible. We can help!',
                },
                {
                    category: 'Erectile Dysfunction',
                    title: 'Erections can be a tricky thing. But no need to feel down!',
                }
            ];

            services.forEach(service => {
                expect(screen.getByText(service.category)).toBeInTheDocument();
                expect(screen.getByText(service.title)).toBeInTheDocument();
            });
        });
    });

});