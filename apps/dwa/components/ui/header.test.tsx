// @vitest-environment jsdom
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './header';
import { vi, describe, it, expect } from 'vitest';

// Mock Provider
const mockSetSidebarOpen = vi.fn();
vi.mock('@/app/app-provider', () => ({
    useAppProvider: () => ({
        sidebarOpen: false,
        setSidebarOpen: mockSetSidebarOpen
    })
}));

// Mock Child Components
vi.mock('@/components/search-modal', () => ({ default: ({ isOpen }: { isOpen: boolean }) => <div data-testid="search-modal">{isOpen ? 'Open' : 'Closed'}</div> }));
vi.mock('@/components/dropdown-notifications', () => ({ default: () => <div data-testid="notifications">Notifications</div> }));
vi.mock('@/components/dropdown-help', () => ({ default: () => <div data-testid="help">Help</div> }));
vi.mock('@/components/theme-toggle', () => ({ default: () => <div data-testid="theme-toggle">ThemeToggle</div> }));
vi.mock('@/components/dropdown-profile', () => ({ default: () => <div data-testid="profile">Profile</div> }));

describe('Header Component', () => {
    it('renders all child components', () => {
        render(<Header />);

        expect(screen.getByTestId('notifications')).toBeInTheDocument();
        expect(screen.getByTestId('help')).toBeInTheDocument();
        expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
        expect(screen.getByTestId('profile')).toBeInTheDocument();
    });

    it('toggles sidebar on hamburger click', () => {
        render(<Header />);

        const hamburger = screen.getByRole('button', { name: /open sidebar/i });
        fireEvent.click(hamburger);

        expect(mockSetSidebarOpen).toHaveBeenCalledWith(true);
    });

    it('opens search modal on click', () => {
        render(<Header />);

        const searchButton = screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchButton);

        expect(screen.getByTestId('search-modal')).toHaveTextContent('Open');
    });

    it('renders with different variants', () => {
        const { rerender } = render(<Header variant="v2" />);
        // Check if specific class is applied (simplistic check)
        const header = screen.getByRole('banner');
        expect(header).toHaveClass('before:bg-white');

        rerender(<Header variant="v3" />);
        expect(header).toHaveClass('dark:before:bg-gray-900');
    });
});
