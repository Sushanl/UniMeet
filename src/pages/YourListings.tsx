import { useState, useEffect } from 'react'
import { useAuth } from '../lib/useAuth'
import { supabase } from '../lib/supabaseClient'
import { mockEvents } from '../mockdata/mockEvents'
import { EventCard } from '../components/EventCard'
import { redirect } from 'react-router-dom'



export function YourListings() {
  const { user } = useAuth()
  const [listings, setListings] = useState(mockEvents)


  useEffect(() => {

    if (!user) {
      redirect('/signin')
    }

    const fetchListings = async () => {
      const { data, error } = await supabase.from('listings').select('*').eq('user_id', user?.id)
      if (error) {
        console.error('Error fetching listings:', error)
      } else {
        setListings(data)
      }
    }
    fetchListings()
  }, [user])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Your Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <EventCard key={listing.id} {...listing} />
        ))}
      </div>
    </div>
  )
}