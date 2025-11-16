import { Map, Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { EventCardProps } from './EventCard';
import { getEventIcon } from '../utils/eventIcons';

interface MapPlaceholderProps {
  events?: EventCardProps[];
  onMarkerClick?: (eventId: string) => void;
}

export function OSMMap({ events = [], onMarkerClick }: MapPlaceholderProps) {
  return (
    <Map
      initialViewState={{
        longitude: -123.2460,
        latitude: 49.2606,
        zoom: 14
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="https://tiles.openfreemap.org/styles/liberty"
    >
      {events.map((event) => {
        const Icon = getEventIcon(event.eventType);
        return (
          <Marker
            key={event.id}
            longitude={event.longitude}
            latitude={event.latitude}
            anchor="bottom"
          >
            <div
              className="relative"
              onClick={() => onMarkerClick?.(event.id)}
            >
              <div className="absolute inset-0 bg-white rounded-full blur-sm opacity-75" />
              <div className="relative bg-red-500 text-white p-2 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg">
                <Icon size={20} strokeWidth={2} />
              </div>
            </div>
          </Marker>
        );
      })}
    </Map>
  );
}
