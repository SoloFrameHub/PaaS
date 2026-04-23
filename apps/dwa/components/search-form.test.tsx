/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SearchForm from './search-form'

describe('SearchForm Component', () => {
    it('renders with default placeholder', () => {
        render(<SearchForm />)
        const input = screen.getByPlaceholderText('Search…')
        expect(input).toBeInTheDocument()
    })

    it('renders with custom placeholder', () => {
        render(<SearchForm placeholder="Custom search..." />)
        const input = screen.getByPlaceholderText('Custom search...')
        expect(input).toBeInTheDocument()
    })

    it('has a search button with aria-label', () => {
        render(<SearchForm />)
        const button = screen.getByRole('button', { name: /search/i })
        expect(button).toBeInTheDocument()
    })
})
