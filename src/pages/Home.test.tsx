import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { Home } from './Home'
import { AuthProvider } from '../hooks/useAuth'

vi.mock('axios')

const mockCharactersResponse = {
  data: {
    count: 1,
    next: null,
    previous: null,
    results: [
      {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        homeworld: 'https://swapi.dev/api/planets/1/',
        films: ['https://swapi.dev/api/films/1/'],
        species: [],
        vehicles: [],
        starships: [],
        created: '2014-12-09T13:50:51.644000Z',
        edited: '2014-12-20T21:17:56.891000Z',
        url: 'https://swapi.dev/api/people/1/',
      },
    ],
  },
}

const mockHomeworldResponse = {
  data: {
    name: 'Tatooine',
    terrain: 'desert',
    climate: 'arid',
    population: '200000',
  },
}

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.setItem('sw_token', 'mock_token')
    localStorage.setItem('sw_token_expiry', (Date.now() + 3600000).toString())
  })

  it('fetches and displays characters', async () => {
    const mockedAxios = vi.mocked(axios.get)
    mockedAxios.mockResolvedValueOnce(mockCharactersResponse)
    mockedAxios.mockResolvedValueOnce(mockHomeworldResponse)

    renderWithProviders(<Home />)

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    })
  })

  it('opens modal with character details when card is clicked', async () => {
    const mockedAxios = vi.mocked(axios.get)
    mockedAxios.mockResolvedValueOnce(mockCharactersResponse)
    mockedAxios.mockResolvedValueOnce(mockHomeworldResponse)

    renderWithProviders(<Home />)

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    })

    const card = screen.getByText('Luke Skywalker').closest('div')
    if (card) {
      card.click()
    }

    await waitFor(() => {
      expect(screen.getByText('Height')).toBeInTheDocument()
      expect(screen.getByText('Mass')).toBeInTheDocument()
      expect(screen.getByText('Birth Year')).toBeInTheDocument()
    })
  })
})
