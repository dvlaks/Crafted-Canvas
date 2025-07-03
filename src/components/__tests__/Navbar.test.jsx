import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Navbar from '../Navbar'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    img: ({ children, ...props }) => <img {...props}>{children}</img>,
    ul: ({ children, ...props }) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }) => <li {...props}>{children}</li>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }) => children,
}))

// Mock assets
vi.mock('../../assets', () => ({
  default: {
    logo: 'mock-logo.png',
    menu: 'mock-menu.svg',
    close: 'mock-close.svg',
    linkedin: 'mock-linkedin.png',
    instagram: 'mock-instagram.png',
    github: 'mock-github.png',
  },
  logo: 'mock-logo.png',
  menu: 'mock-menu.svg',
  close: 'mock-close.svg',
  linkedin: 'mock-linkedin.png',
  instagram: 'mock-instagram.png',
  github: 'mock-github.png',
  backend: 'mock-backend.png',
  creator: 'mock-creator.png',
  mobile: 'mock-mobile.png',
  web: 'mock-web.png',
  moon: 'mock-moon.png',
  carrent: 'mock-carrent.png',
  tripguide: 'mock-tripguide.png',
  css: 'mock-css.png',
  docker: 'mock-docker.png',
  figma: 'mock-figma.png',
  git: 'mock-git.png',
  html: 'mock-html.png',
  javascript: 'mock-javascript.png',
  mongodb: 'mock-mongodb.png',
  nodejs: 'mock-nodejs.png',
  reactjs: 'mock-reactjs.png',
  redux: 'mock-redux.png',
  tailwind: 'mock-tailwind.png',
  typescript: 'mock-typescript.png',
  threejs: 'mock-threejs.svg',
}))

// Mock constants
vi.mock('../../constants', () => ({
  navLinks: [
    { id: 'about', title: 'About' },
    { id: 'work', title: 'Work' },
    { id: 'contact', title: 'Contact' }
  ]
}))

// Helper function to render with Router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Navbar Component', () => {
  it('renders navigation menu', () => {
    renderWithRouter(<Navbar />)
    
    // Check if navigation links are present (multiple instances for desktop/mobile)
    const aboutLinks = screen.getAllByText('About')
    const workLinks = screen.getAllByText('Work')
    const contactLinks = screen.getAllByText('Contact')
    
    expect(aboutLinks.length).toBeGreaterThan(0)
    expect(workLinks.length).toBeGreaterThan(0)
    expect(contactLinks.length).toBeGreaterThan(0)
    
    // Verify at least one of each link is present
    expect(aboutLinks[0]).toBeInTheDocument()
    expect(workLinks[0]).toBeInTheDocument()
    expect(contactLinks[0]).toBeInTheDocument()
  })

  it('displays logo', () => {
    renderWithRouter(<Navbar />)
    
    const logo = screen.getByAltText('logo')
    expect(logo).toBeInTheDocument()
  })

  it('has accessible navigation structure', () => {
    renderWithRouter(<Navbar />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })
})
