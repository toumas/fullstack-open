import { useCallback, useEffect, useState } from 'react'
import phonebook from './services/phonebook'
import Notification from './Notification'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [query, setQuery] = useState('')
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [notification, setNotification] = useState({ message: null })

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    if (newName.length === 0) {
      return
    }
    const person = findPerson(persons, newName) ?? false
    if (!person) {
      const newPerson = await phonebook.create({ name: newName, number: phoneNumber })
      setPersons(persons.concat(newPerson))
      setNewName('')
      setPhoneNumber('')
      handleNotificationText({ message: `Added ${newName}` })
    }
    if (
      person &&
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      )
    ) {
      try {
        await phonebook.update(person.id, { name: newName, number: phoneNumber })
        setPersons(await phonebook.getAll())
        handleNotificationText({ message: `Updated ${newName}` })
      } catch {
        handleNotificationText({
          message: `Information of ${newName} has already been removed from server`,
          type: 'error',
        })
      }
    }
  }

  const handleNotificationText = useCallback((notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification({ message: null })
    }, 3000)
  }, [])

  const handleOnDelete = async (person) => {
    if (!window.confirm(`Delete ${person.name} ?`)) {
      return
    }
    await phonebook.remove(person.id)
    setPersons(await phonebook.getAll())
  }

  const handleNameOnChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberOnChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handleQueryOnChange = (event) => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    const getPersons = async () => {
      setPersons(await phonebook.getAll())
    }
    getPersons()
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification {...notification} />
      <Filter query={query} handleQueryOnChange={handleQueryOnChange} />
      <h3>Add a new</h3>
      <PersonForm
        handleOnSubmit={handleOnSubmit}
        newName={newName}
        handleNameOnChange={handleNameOnChange}
        phoneNumber={phoneNumber}
        handlePhoneNumberOnChange={handlePhoneNumberOnChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} query={query} onDelete={handleOnDelete} />
    </div>
  )
}

const findPerson = (persons, newName) => {
  return persons.find(
    ({ name }) => newName.toLowerCase() === name.toLowerCase(),
  )
}

export default App
