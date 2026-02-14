import { useSuspenseQuery } from '@tanstack/react-query';
import type { Country as CountryType, Weather as WeatherType } from './types'

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP

interface CountryProps {
  country: null | CountryType
}

const Country = ({ country }: CountryProps) => {
  const { data: weather } = useSuspenseQuery<WeatherType | undefined>({
    queryKey: ['weather', country?.name.common],
    queryFn: () => getWeather(country),
  });

  if (country === null) {
    return null
  }

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <ul>{Object.values(country.languages)
        .map(language => (
          <li key={language}>{language}</li>))}
      </ul>
      <img src={country.flags.png} />
      <h2>Weather in {country.capital}</h2>
      <p>Temperature {weather?.main.temp} Celcius</p>
      <img src={`https://openweathermap.org/payload/api/media/file/${weather?.weather[0].icon}.png`}/>
      <p>Wind {weather?.wind.speed} m/s</p>
    </>
  )
}

async function getWeather(country: CountryType | null): Promise<WeatherType | undefined> {
  if (country === null) {
    return undefined
  }
  const { latlng: [lat, lng] } = country
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${API_KEY}&units=metric`
  )
  return (await response.json()) as WeatherType
}

export default Country
