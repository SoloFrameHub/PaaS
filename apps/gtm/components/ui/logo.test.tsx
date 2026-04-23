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

    it('renders the logo image', () => {
        render(<Logo />)
        const img = screen.getByAltText('SoloFrameHub')
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', expect.stringContaining('soloframehub-logo-main.png'))
    })
})
