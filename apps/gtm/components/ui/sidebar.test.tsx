// @vitest-environment jsdom
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from './sidebar';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock Provider
const mockSetSidebarOpen = vi.fn();
const mockSetSidebarExpanded = vi.fn();

vi.mock('@/app/app-provider', () => ({
    useAppProvider: () => ({
        sidebarOpen: true, // Start open for testing
        setSidebarOpen: mockSetSidebarOpen,
        sidebarExpanded: true,
        setSidebarExpanded: mockSetSidebarExpanded,
    })
}));

// Mock Next.js Navigation
vi.mock('next/navigation', () => ({
    useSelectedLayoutSegments: () => ['dashboard'] // Default segment
}));

// Mock Window Width
vi.mock('@/components/utils/use-window-width', () => ({
    useWindowWidth: () => 1024
}));

// Mock Child Components
vi.mock('./logo', () => ({ default: () => <div data-testid="logo">Logo</div> }));
vi.mock('./sidebar-link', () => ({ default: ({ children, href }: any) => <a href={href} data-testid="sidebar-link">{children}</a> }));
vi.mock('./sidebar-link-group', () => ({
    default: ({ children, open }: any) => <div data-testid="sidebar-group" data-open={open}>{children(() => { }, open)}</div>
}));

const mockTracks = [
    {
        id: 'sales-foundations',
        title: 'Sales Foundations',
        magnetComponent: 'F',
        courses: [
            { id: 'course-1', title: 'Course 1' }
        ]
    }
];

describe('Sidebar Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders logo and basic links', () => {
        render(<Sidebar tracks={[]} />);

        expect(screen.getByTestId('logo')).toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Solo Advisor AI')).toBeInTheDocument();
    });

    it('renders tracks and courses', () => {
        render(<Sidebar tracks={mockTracks} />);

        expect(screen.getByText('Sales Foundations')).toBeInTheDocument();
        expect(screen.getByText('Course 1')).toBeInTheDocument();
    });

    it('handles mobile close button', () => {
        // Mock window width to be mobile? Or just verify button exists which shows on mobile
        // The component uses lg:hidden for the close button.
        // jsdom doesn't handle CSS media queries visibility, but we can check if button is in DOM
        // and clicking it triggers setSidebarOpen

        render(<Sidebar tracks={[]} />);

        const closeButton = screen.getByRole('button', { name: /close sidebar/i });
        fireEvent.click(closeButton);

        expect(mockSetSidebarOpen).toHaveBeenCalledWith(false);
    });

    it('handles expand/collapse button', () => {
        render(<Sidebar tracks={[]} />);

        const expandButton = screen.getByRole('button', { name: /expand \/ collapse sidebar/i });
        fireEvent.click(expandButton);

        expect(mockSetSidebarExpanded).toHaveBeenCalledWith(false); // since it started true
    });

    it('highlights active dashboard link', () => {
        // Default mock returns 'dashboard' segment
        render(<Sidebar tracks={[]} />);
        // Logic check: if segment matches, class is applied.
        // Hard to test exact CSS class application with just text check, but can check structure
        const dashboardLink = screen.getByText('Dashboard').closest('li');
        expect(dashboardLink).toHaveClass('bg-primary-500/[0.08]');
    });
});
