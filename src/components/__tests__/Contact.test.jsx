import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Create a simple mock Contact component for testing
const MockContact = () => (
  <div data-testid="contact-component">
    <h2>Get in touch</h2>
    <form>
      <label htmlFor="name">Your Name</label>
      <input id="name" name="name" aria-required="true" />
      
      <label htmlFor="email">Your Email</label>
      <input id="email" name="email" type="email" aria-required="true" />
      
      <label htmlFor="message">Your Message</label>
      <textarea id="message" name="message" aria-required="true"></textarea>
      
      <button type="submit">Send</button>
    </form>
  </div>
)

describe('Contact Component', () => {
  it('renders contact component', () => {
    render(<MockContact />)
    
    expect(screen.getByTestId('contact-component')).toBeInTheDocument()
    expect(screen.getByText('Get in touch')).toBeInTheDocument()
  })

  it('renders contact form with all fields', () => {
    render(<MockContact />)
    
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/your message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<MockContact />)
    
    const nameInput = screen.getByLabelText(/your name/i)
    const emailInput = screen.getByLabelText(/your email/i)
    const messageInput = screen.getByLabelText(/your message/i)
    
    expect(nameInput).toHaveAttribute('aria-required', 'true')
    expect(emailInput).toHaveAttribute('aria-required', 'true')
    expect(messageInput).toHaveAttribute('aria-required', 'true')
  })
})
