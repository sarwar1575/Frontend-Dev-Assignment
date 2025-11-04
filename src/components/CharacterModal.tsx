import { motion, AnimatePresence } from 'framer-motion'
import { CharacterWithDetails } from '../types/characterTypes'
import { formatDate } from '../utils/formatDate'
import { getSpeciesColor, getRandomImageId } from '../utils/speciesColors'

interface CharacterModalProps {
  character: CharacterWithDetails | null
  isOpen: boolean
  onClose: () => void
}

export const CharacterModal = ({ character, isOpen, onClose }: CharacterModalProps) => {
  if (!character) return null

  const accentColor = getSpeciesColor(character.species, character.speciesData)
  const imageId = getRandomImageId(character.name)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div 
              className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto shadow-2xl"
              style={{ borderTop: `4px solid ${accentColor}` }}
            >
              <div className="relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={`https://picsum.photos/seed/${imageId}/800/400`}
                    alt={character.name}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{ backgroundColor: accentColor }}
                  />
                  <div className="absolute inset-0 flex items-end p-6">
                    <h2 className="text-4xl font-orbitron font-bold text-white drop-shadow-lg">
                      {character.name}
                    </h2>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <p className="text-sw-gray text-sm font-poppins mb-1">Height</p>
                      <p className="text-white text-xl font-orbitron font-semibold">
                        {character.height === 'unknown' ? 'Unknown' : `${character.height} m`}
                      </p>
                    </div>
                    
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <p className="text-sw-gray text-sm font-poppins mb-1">Mass</p>
                      <p className="text-white text-xl font-orbitron font-semibold">
                        {character.mass === 'unknown' ? 'Unknown' : `${character.mass} kg`}
                      </p>
                    </div>
                    
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <p className="text-sw-gray text-sm font-poppins mb-1">Birth Year</p>
                      <p className="text-white text-xl font-orbitron font-semibold">
                        {character.birth_year}
                      </p>
                    </div>
                    
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <p className="text-sw-gray text-sm font-poppins mb-1">Films</p>
                      <p className="text-white text-xl font-orbitron font-semibold">
                        {character.films.length}
                      </p>
                    </div>
                  </div>

                  {character.homeworldData && (
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h3 className="text-sw-yellow text-lg font-orbitron font-semibold mb-3">
                        Homeworld
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-sw-gray text-sm font-poppins mb-1">Name</p>
                          <p className="text-white font-poppins font-medium">
                            {character.homeworldData.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-sw-gray text-sm font-poppins mb-1">Terrain</p>
                          <p className="text-white font-poppins font-medium">
                            {character.homeworldData.terrain}
                          </p>
                        </div>
                        <div>
                          <p className="text-sw-gray text-sm font-poppins mb-1">Climate</p>
                          <p className="text-white font-poppins font-medium">
                            {character.homeworldData.climate}
                          </p>
                        </div>
                        <div>
                          <p className="text-sw-gray text-sm font-poppins mb-1">Population</p>
                          <p className="text-white font-poppins font-medium">
                            {character.homeworldData.population === 'unknown' 
                              ? 'Unknown' 
                              : parseInt(character.homeworldData.population).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-sw-gray text-sm font-poppins mb-1">Date Added</p>
                    <p className="text-white font-poppins font-medium">
                      {formatDate(character.created)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
