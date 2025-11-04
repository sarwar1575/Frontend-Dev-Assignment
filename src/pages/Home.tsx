import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { useFetch } from '../hooks/useFetch'
import { Character, CharacterWithDetails, SWAPIResponse, Homeworld, Species, Film } from '../types/characterTypes'
import { CharacterCard } from '../components/CharacterCard'
import { CharacterModal } from '../components/CharacterModal'
import { SearchBar } from '../components/SearchBar'
import { Pagination } from '../components/Pagination'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'

export const Home = () => {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecies, setSelectedSpecies] = useState<string>('')
  const [selectedFilm, setSelectedFilm] = useState<string>('')
  const [selectedHomeworld, setSelectedHomeworld] = useState<string>('')
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterWithDetails | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [allCharacters, setAllCharacters] = useState<Character[]>([])
  const [speciesOptions, setSpeciesOptions] = useState<string[]>([])
  const [filmOptions, setFilmOptions] = useState<string[]>([])
  const [homeworldOptions, setHomeworldOptions] = useState<string[]>([])
  const [speciesDataMap, setSpeciesDataMap] = useState<Record<string, Species>>({})
  const [filmDataMap, setFilmDataMap] = useState<Record<string, Film>>({})
  const [homeworldDataMap, setHomeworldDataMap] = useState<Record<string, Homeworld>>({})

  const apiUrl = `https://swapi.dev/api/people/?page=${page}`
  const { data, loading, error, refetch } = useFetch<SWAPIResponse<Character>>(apiUrl)

  useEffect(() => {
    if (data?.results) {
      setAllCharacters(prev => {
        const newChars = data.results.filter(char => 
          !prev.find(p => p.url === char.url)
        )
        return [...prev, ...newChars]
      })
    }
  }, [data])

  useEffect(() => {
    const fetchAllData = async () => {
      const uniqueSpecies = new Set<string>()
      const uniqueFilms = new Set<string>()
      const uniqueHomeworlds = new Set<string>()

      allCharacters.forEach(char => {
        char.species.forEach(url => uniqueSpecies.add(url))
        char.films.forEach(url => uniqueFilms.add(url))
        if (char.homeworld) uniqueHomeworlds.add(char.homeworld)
      })

      const speciesPromises = Array.from(uniqueSpecies).map(url => 
        axios.get<Species>(url).then(res => ({ url, data: res.data }))
      )
      const filmPromises = Array.from(uniqueFilms).map(url => 
        axios.get<Film>(url).then(res => ({ url, data: res.data }))
      )
      const homeworldPromises = Array.from(uniqueHomeworlds).map(url => 
        axios.get<Homeworld>(url).then(res => ({ url, data: res.data }))
      )

      const [speciesResults, filmResults, homeworldResults] = await Promise.all([
        Promise.all(speciesPromises),
        Promise.all(filmPromises),
        Promise.all(homeworldPromises),
      ])

      const speciesMap: Record<string, Species> = {}
      const filmMap: Record<string, Film> = {}
      const homeworldMap: Record<string, Homeworld> = {}

      speciesResults.forEach(({ url, data }) => {
        speciesMap[url] = data
      })
      filmResults.forEach(({ url, data }) => {
        filmMap[url] = data
      })
      homeworldResults.forEach(({ url, data }) => {
        homeworldMap[url] = data
      })

      setSpeciesDataMap(speciesMap)
      setFilmDataMap(filmMap)
      setHomeworldDataMap(homeworldMap)

      setSpeciesOptions(Array.from(new Set(Object.values(speciesMap).map(s => s.name))))
      setFilmOptions(Array.from(new Set(Object.values(filmMap).map(f => f.title))))
      setHomeworldOptions(Array.from(new Set(Object.values(homeworldMap).map(h => h.name))))
    }

    if (allCharacters.length > 0) {
      fetchAllData()
    }
  }, [allCharacters])

  const hasActiveFilters = searchQuery || selectedSpecies || selectedFilm || selectedHomeworld

  const filteredCharacters = useMemo(() => {
    const sourceData = hasActiveFilters ? allCharacters : (data?.results || [])

    let filtered = [...sourceData]

    if (searchQuery) {
      filtered = filtered.filter(char =>
        char.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedSpecies) {
      filtered = filtered.filter(char => {
        const speciesNames = char.species
          .map(url => speciesDataMap[url]?.name)
          .filter(Boolean)
        return speciesNames.includes(selectedSpecies)
      })
    }

    if (selectedFilm) {
      filtered = filtered.filter(char => {
        const filmTitles = char.films
          .map(url => filmDataMap[url]?.title)
          .filter(Boolean)
        return filmTitles.includes(selectedFilm)
      })
    }

    if (selectedHomeworld) {
      filtered = filtered.filter(char => {
        const homeworldName = homeworldDataMap[char.homeworld]?.name
        return homeworldName === selectedHomeworld
      })
    }

    return filtered
  }, [data?.results, allCharacters, searchQuery, selectedSpecies, selectedFilm, selectedHomeworld, speciesDataMap, filmDataMap, homeworldDataMap, hasActiveFilters])

  const handleCharacterClick = async (character: Character) => {
    const homeworldData = homeworldDataMap[character.homeworld]
      ? homeworldDataMap[character.homeworld]
      : await axios.get<Homeworld>(character.homeworld).then(res => res.data)

    const speciesData = await Promise.all(
      character.species.map(url =>
        speciesDataMap[url]
          ? Promise.resolve(speciesDataMap[url])
          : axios.get<Species>(url).then(res => res.data)
      )
    )

    const filmsData = await Promise.all(
      character.films.map(url =>
        filmDataMap[url]
          ? Promise.resolve(filmDataMap[url])
          : axios.get<Film>(url).then(res => res.data)
      )
    )

    const characterWithDetails: CharacterWithDetails = {
      ...character,
      homeworldData,
      speciesData,
      filmsData,
    }

    setSelectedCharacter(characterWithDetails)
    setIsModalOpen(true)
  }

  const totalPages = data ? Math.ceil(data.count / 10) : 1

  if (loading && allCharacters.length === 0) {
    return <Loader />
  }

  if (error && allCharacters.length === 0) {
    return <ErrorMessage message={error} onRetry={refetch} />
  }

  return (
    <div className="min-h-screen bg-sw-dark py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-orbitron font-bold text-center text-white mb-2">
            Star Wars Characters
          </h1>
          <p className="text-sw-gray text-center font-poppins">
            Explore the galaxy far, far away...
          </p>
        </div>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <select
            value={selectedSpecies}
            onChange={(e) => setSelectedSpecies(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-sw-yellow focus:ring-2 focus:ring-sw-yellow/20 font-poppins"
          >
            <option value="">All Species</option>
            {speciesOptions.map(species => (
              <option key={species} value={species}>{species}</option>
            ))}
          </select>

          <select
            value={selectedFilm}
            onChange={(e) => setSelectedFilm(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-sw-yellow focus:ring-2 focus:ring-sw-yellow/20 font-poppins"
          >
            <option value="">All Films</option>
            {filmOptions.map(film => (
              <option key={film} value={film}>{film}</option>
            ))}
          </select>

          <select
            value={selectedHomeworld}
            onChange={(e) => setSelectedHomeworld(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-sw-yellow focus:ring-2 focus:ring-sw-yellow/20 font-poppins"
          >
            <option value="">All Homeworlds</option>
            {homeworldOptions.map(homeworld => (
              <option key={homeworld} value={homeworld}>{homeworld}</option>
            ))}
          </select>
        </div>

        {loading && allCharacters.length > 0 && (
          <div className="text-center text-sw-yellow font-poppins mb-4">
            Loading more characters...
          </div>
        )}

        {filteredCharacters.length === 0 && !loading ? (
          <div className="text-center text-sw-gray font-poppins text-xl py-16">
            No characters found matching your criteria.
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredCharacters.map((character) => (
                <CharacterCard
                  key={character.url}
                  character={character}
                  onClick={() => handleCharacterClick(character)}
                  speciesData={character.species.map(url => speciesDataMap[url]).filter(Boolean)}
                />
              ))}
            </div>

            {!hasActiveFilters && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>

      <CharacterModal
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
