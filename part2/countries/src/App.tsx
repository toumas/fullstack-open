import { Activity, Suspense, useState, type ChangeEvent } from 'react'
import './App.css'
import { ErrorBoundary } from 'react-error-boundary'
import SearchAndResults from './SearchAndResults'
import type { Countries, Country } from './types'
import { useSuspenseQuery } from '@tanstack/react-query'

function App() {
  const [query, setQuery] = useState<string>('')
  const [visibleCountry, setVisibleCountry] = useState<Country | null>(null)

  const { data: allCountries } = useSuspenseQuery({
    queryKey: ['countries'],
    queryFn: () => getAllCountries(),
  });

  const countries = allCountries.filter(
    ({ name: { common } }) => {
      return common.toLowerCase().includes(query.toLowerCase())
    },
  )

  const handleQueryOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const countries = allCountries.filter(
      ({ name: { common } }) => {
        return common.toLowerCase().includes(event.target.value.toLowerCase())
      },
    )
    setQuery(event.target.value)
    if (countries.length === 1) {
      setVisibleCountry(countries[0])
      return
    }
    setVisibleCountry(null)
  }

  const handleQueryOnFocus = () => {
    setVisibleCountry(null)
  }

  const handleShowOnClick = (country: Country) => {
    return () => {
      setVisibleCountry(country)
    }
  }

  return (
    <main>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <label htmlFor="query">find countries </label>
        <input
          id="query"
          value={query ?? ''}
          onChange={handleQueryOnChange}
          onFocus={handleQueryOnFocus}
        />
      </form>
      <ErrorBoundary
        fallback={
          <div role="alert">
            <p>Jotain meni pahasti pieleen. Yritä myöhemmin uudelleen.</p>
          </div>
        }
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Activity mode={(query ?? '').length > 0 ? 'visible' : 'hidden'}>
            <SearchAndResults
              countries={countries}
              country={visibleCountry}
              handleShowOnClick={handleShowOnClick}
            />
          </Activity>
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}

async function getAllCountries() {
  const response = await fetch(
    `https://studies.cs.helsinki.fi/restcountries/api/all`,
  )
  if (response.status === 404) {
    return [] as Countries
  }
  return response.json() as Promise<Countries>
}

export default App
