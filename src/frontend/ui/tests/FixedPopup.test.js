import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Popup from '../FixedPopup';

describe('Popup Component', () => {
  let defaultProps;
  let ref;

  beforeEach(() => {
    defaultProps = {
      isFixed: true,
      isVisible: true,
      onClose: jest.fn(),
    };
    ref = React.createRef();
  });

  test('renders correctly when visible', () => {
    render(<Popup ref={ref} {...defaultProps}>Popup Content</Popup>);
    expect(screen.getByText('Popup Content')).toBeInTheDocument();
  });

  test('is hidden when isVisible is false', () => {
    render(<Popup ref={ref} {...defaultProps} isVisible={false}>Popup Content</Popup>);
    expect(screen.getByText('Popup Content')).toHaveClass('hidden');
  });

  test('has fixed position when isFixed is true', () => {
    render(<Popup ref={ref} {...defaultProps} isFixed={true}>Popup Content</Popup>);
    expect(screen.getByText('Popup Content')).toHaveStyle('position: fixed');
  });

  test('has absolute position when isFixed is false', () => {
    render(<Popup ref={ref} {...defaultProps} isFixed={false}>Popup Content</Popup>);
    expect(screen.getByText('Popup Content')).toHaveStyle('position: absolute');
  });

  test('calls onClose when clicking outside', () => {
    render(<Popup ref={ref} {...defaultProps}>Popup Content</Popup>);
    fireEvent.click(document.body);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when scrolling', () => {
    render(<Popup ref={ref} {...defaultProps}>Popup Content</Popup>);
    fireEvent.wheel(window);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when not visible', () => {
    render(<Popup ref={ref} {...defaultProps} isVisible={false}>Popup Content</Popup>);
    fireEvent.scroll(document.body);
    fireEvent.click(document.body);
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });
});