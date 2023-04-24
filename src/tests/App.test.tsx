import { fireEvent, getByText, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';


describe('input change', () => {
  test('get suggestions from successful api call', async() => {
    render(<App />)
    const input = screen.getByPlaceholderText(/type to search/i)
    fireEvent.change(input, { target: { value: 'morty' } })
    await waitFor(() => {
      expect(screen.getByText('Aqua Morty')).toBeInTheDocument()
    })
  })
  test('nothing found', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText(/type to search/i)
    fireEvent.change(input, { target: { value: 'qwewryup' } })
    await waitFor(() => {
      expect(screen.getByText(/ничего не найдено/i)).toBeInTheDocument()
    })
  })
})

describe('Suggestions list', () => {
  test('click on suggestion put value into input', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText(/type to search/i)
    userEvent.type(input, 'morty');
    expect(input).toHaveValue('morty')
    await waitFor(() => expect(screen.getByText('Aqua Morty')).toBeInTheDocument())
    const listItem = screen.getByText('Aqua Morty')
    fireEvent.click(listItem)
    expect(screen.getByPlaceholderText(/type to search/i)).toHaveValue('Aqua Morty')
  })
})