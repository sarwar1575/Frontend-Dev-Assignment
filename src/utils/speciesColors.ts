import { SpeciesColorMap } from '../types/characterTypes'

export const speciesColorMap: SpeciesColorMap = {
  'Human': '#4A90E2',
  'Droid': '#50C878',
  'Wookiee': '#8B4513',
  'Rodian': '#228B22',
  'Hutt': '#9370DB',
  "Yoda's species": '#FFD700',
  'Trandoshan': '#FF6347',
  'Mon Calamari': '#00CED1',
  'Ewok': '#CD853F',
  'Sullustan': '#FFA500',
  'Neimodian': '#FF69B4',
  'Gungan': '#20B2AA',
  'Toydarian': '#FF1493',
  'Dug': '#8A2BE2',
  "Twi'lek": '#FF00FF',
  'Aleena': '#00FF00',
  'Vulptereen': '#FFFF00',
  'Xexto': '#00FFFF',
  'Toong': '#FF4500',
  'Cerean': '#FFD700',
  'Nautolan': '#4169E1',
  'Zabrak': '#DC143C',
  'Tholothian': '#9370DB',
  'Iktotchi': '#FF6347',
  'Quermian': '#20B2AA',
  'Kel Dor': '#FF1493',
  'Chagrian': '#4169E1',
  'Geonosian': '#FFA500',
  'Mirialan': '#00CED1',
  'Clawdite': '#9370DB',
  'Besalisk': '#FF6347',
  'Kaminoan': '#00FFFF',
  'Skakoan': '#FFD700',
  'Muun': '#FF69B4',
  'Togruta': '#FF1493',
  'Kaleesh': '#DC143C',
  "Pau'an": '#8B4513',
}

export const getSpeciesColor = (speciesUrls: string[], speciesData?: any[]): string => {
  if (!speciesUrls || speciesUrls.length === 0) {
    return '#6B7280'
  }
  
  const firstSpecies = speciesData?.[0]
  const speciesName = firstSpecies?.name || 'Unknown'
  
  return speciesColorMap[speciesName] || '#6B7280'
}

export const getRandomImageId = (name: string): number => {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash) % 1000
}
