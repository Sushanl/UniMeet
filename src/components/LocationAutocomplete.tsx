import { useState, useCallback } from 'react'
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api'
import { TextField, Text } from '@radix-ui/themes'

const libraries: ("places")[] = ['places']

interface LocationData {
  name: string
  lat: number
  lng: number
}

interface LocationAutocompleteProps {
  value: string
  onLocationChange: (location: LocationData) => void
  required?: boolean
}

export function LocationAutocomplete({ value, onLocationChange, required }: LocationAutocompleteProps) {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
  const [inputValue, setInputValue] = useState(value)

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries
  })

  const onLoad = useCallback((autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance)
  }, [])

  const onPlaceChanged = useCallback(() => {
    if (autocomplete) {
      const place = autocomplete.getPlace()

      if (place.geometry?.location) {
        const locationData: LocationData = {
          name: place.formatted_address || place.name || '',
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }

        setInputValue(locationData.name)
        onLocationChange(locationData)
      }
    }
  }, [autocomplete, onLocationChange])

  if (loadError) {
    return (
      <div>
        <Text size="2" color="red">Error loading Google Maps</Text>
        <TextField.Root
          placeholder="Location"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required={required}
          size="3"
        />
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <TextField.Root
        placeholder="Loading..."
        disabled
        size="3"
      />
    )
  }

  return (
    <Autocomplete
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
    >
      <TextField.Root
        placeholder="Search for a location"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        required={required}
        size="3"
      />
    </Autocomplete>
  )
}
