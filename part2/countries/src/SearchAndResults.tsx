import { Activity } from 'react'
import type { Countries, Country as CountryType } from './types'
import Country from './Country';

interface SearchFilterProps {
  countries: Countries
  country: CountryType | null
  handleShowOnClick: (country: CountryType) => () => void
}

const SearchAndResults = ({ countries, country, handleShowOnClick }: SearchFilterProps) => {
  return (
    <section>
      <Activity mode={countries.length > 10 ? 'visible' : 'hidden'}>
        Too many matches, specify another filter
      </Activity>
      <Activity
        mode={
          countries.length < 10 && country === null ? 'visible' : 'hidden'
        }
      >
        <ul className='country-list'>
          {countries.map((country) => {
            const { name: { common } } = country
            return (
              <div key={common} className='item'>
                <li>{common}</li>
                <button onClick={handleShowOnClick(country)}>show</button>
              </div>
            )
          })}
        </ul>
      </Activity>
      {country !== null && <Country country={country} />}
    </section>
  )
}

export default SearchAndResults
