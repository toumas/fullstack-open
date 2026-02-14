export interface NativeName { [lang: string]: { official: string; common: string } }

export interface Name {
  common: string
  official: string
  nativeName?: NativeName
}

export interface Currency {
  name: string
  symbol?: string
}

export interface Idd {
  root?: string
  suffixes?: string[]
}

export interface Flags {
  png?: string
  svg?: string
  alt?: string
}

export interface CoatOfArms {
  png?: string
  svg?: string
}

export interface DemonymsLanguage {
  f: string
  m: string
}

export interface Country {
  name: Name
  tld: string[]
  cca2: string
  ccn3: string
  cca3: string
  cioc: string
  independent: boolean
  status: string
  unMember: boolean
  currencies: { [code: string]: Currency }
  idd: Idd
  capital: string[]
  altSpellings: string[]
  region: string
  subregion: string
  languages: { [code: string]: string }
  translations: { [code: string]: { official: string; common: string } }
  latlng: [number, number]
  landlocked: boolean
  borders: string[]
  area: number
  demonyms: { [lang: string]: DemonymsLanguage }
  flag: string
  maps: { googleMaps: string; openStreetMaps: string }
  population: number
  fifa: string
  car: { signs: string[]; side: string }
  timezones: string[]
  continents: string[]
  flags: Flags
  coatOfArms: CoatOfArms
  startOfWeek: string
  capitalInfo: { latlng: [number, number] }
  postalCode: { format: string; regex: string }
}

export interface WeatherMain {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

export interface WeatherWind {
  speed: number
  deg: number
  gust: number
}

export interface WeatherDescription {
  id: number
  main: string
  description: string
  icon: string
}

export interface Weather {
  coord: { lon: number; lat: number }
  weather: WeatherDescription[]
  base: string
  main: WeatherMain
  visibility: number
  wind: WeatherWind
  clouds: { all: number }
  dt: number
  sys: { country?: string; sunrise?: number; sunset?: number }
  timezone: number
  id: number
  name: string
  cod: number
}

export type Countries = Country[]
