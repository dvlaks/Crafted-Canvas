import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Three from '../three'

// Mock ComputersCanvas
vi.mock('../canvas', () => ({
  ComputersCanvas: () => <div data-testid="computers-canvas">3D Computer Model</div>,
}))

// Mock ThreeJSErrorBoundary
vi.mock('../ThreeJSErrorBoundary', () => ({
  default: ({ children }) => <div data-testid="error-boundary">{children}</div>,
}))

// Mock React Suspense
vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    Suspense: ({ children, fallback }) => {
      // For testing, just render children directly
      return children
    },
  }
})

describe('Three Component', () => {
  it('renders 3D section container', () => {
    render(<Three />)
    
    const section = screen.getByRole('main')
    expect(section).toHaveClass('relative', 'w-full', 'h-screen', 'mx-auto', 'cursor-move')
  })

  it('wraps content in error boundary', () => {
    render(<Three />)
    
    const errorBoundary = screen.getByTestId('error-boundary')
    expect(errorBoundary).toBeInTheDocument()
  })

  it('renders 3D computer canvas', () => {
    render(<Three />)
    
    const canvas = screen.getByTestId('computers-canvas')
    expect(canvas).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(<Three />)
    
    const section = screen.getByRole('main')
    expect(section).toBeInTheDocument()
  })
})
