/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Logo from './logo'

describe('Logo Component', () => {
    it('renders a link to the home page', () => {
        render(<Logo />)
        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', '/')
    })

    it('renders the logo text', () => {
        render(<Logo />)
        expect(screen.getByText('Wellness Academy')).toBeInTheDocument()
    })
})
