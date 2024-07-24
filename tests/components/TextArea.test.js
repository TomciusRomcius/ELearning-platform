import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextArea from '@/frontend/ui/TextArea';

describe('TextArea', () => {
  it('renders textarea element', () => {
    render(<TextArea />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
  });

  it('passes props to textarea element', () => {
    render(<TextArea placeholder="Enter text here" />);
    const textarea = screen.getByPlaceholderText('Enter text here');
    expect(textarea).toBeInTheDocument();
  });

  it('maintains adjusted height after ref change', () => {
    const { rerender } = render(<TextArea />);
    const textarea = screen.getByRole('textbox');
    
    fireEvent.input(textarea, { target: { value: 'Some text\nMore text' } });
    const adjustedHeight = textarea.style.height;
    
    rerender(<TextArea className="new-class" />);
    
    expect(textarea.style.height).toBe(adjustedHeight);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef();
    render(<TextArea ref={ref} />);
    
    expect(ref.current instanceof HTMLTextAreaElement).toBe(true);
  });
});