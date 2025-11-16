import { Map, Marker } from 'react-map-gl/maplibre';
import { MapPin } from 'lucide-react';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { EventCardProps } from './EventCard';

interface MapPlaceholderProps {
  events?: EventCardProps[];
}

export function OSMMap({ events = [] }: MapPlaceholderProps) {
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="https://tiles.openfreemap.org/styles/liberty"
    >
      {events.map((event) => (
        <Marker
          key={event.id}
          longitude={event.longitude}
          latitude={event.latitude}
          anchor="bottom"
        >
          <MapPin
            size={32}
            className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
            fill="currentColor"
            strokeWidth={1.5}
          />
        </Marker>
      ))}
    </Map>
  );
}
