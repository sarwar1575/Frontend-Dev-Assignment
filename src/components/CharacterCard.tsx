import { motion } from 'framer-motion'
import { Character } from '../types/characterTypes'
import { getSpeciesColor, getRandomImageId } from '../utils/speciesColors'

interface CharacterCardProps {
  character: Character
  onClick: () => void
  speciesData?: any[]
}

export const CharacterCard = ({ character, onClick, speciesData }: CharacterCardProps) => {
  const accentColor = getSpeciesColor(character.species, speciesData)
  const imageId = getRandomImageId(character.name)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="cursor-pointer bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
      style={{ borderTop: `4px solid ${accentColor}` }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={`https://picsum.photos/seed/${imageId}/400/300`}
          alt={character.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div 
          className="absolute inset-0 opacity-20"
          style={{ backgroundColor: accentColor }}
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-orbitron font-bold text-white mb-2 truncate">
          {character.name}
        </h3>
        <div className="flex items-center space-x-2 text-sm text-sw-gray">
          <span className="font-poppins">Birth Year:</span>
          <span className="text-sw-yellow font-semibold">{character.birth_year}</span>
        </div>
      </div>
    </motion.div>
  )
}
