import { Search, Filter, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export interface SearchFilters {
  searchTerm: string;
  timeFilter: 'any' | 'today' | 'week' | 'month';
  locationFilter: string;
  eventTypeFilter: 'all' | 'social' | 'study' | 'sports' | 'club' | 'entertainment';
  capacityFilter: 'all' | 'small' | 'medium' | 'large';
}

interface SearchBarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  availableLocations: string[];
}

export function SearchBar({ filters, onFiltersChange, availableLocations }: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = <K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="w-full space-y-4">
      <div className="relative">
        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300 shadow-sm px-4 py-3">
          <Search size={20} className="text-indigo-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search for events, clubs, or keywords..."
            value={filters.searchTerm}
            onChange={(e) => updateFilter('searchTerm', e.target.value)}
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-1.5 text-gray-700 hover:bg-gray-50 rounded transition-colors"
          >
            <Filter size={16} />
            <span className="text-sm font-medium">Filters</span>
            <ChevronDown size={16} className={`text-gray-400 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {filters.searchTerm && (
        <p className="text-sm text-gray-600 italic">
          Tip: You can search multiple terms by separating keywords with commas.
        </p>
      )}

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block mb-2">
              <div className="flex items-center gap-2 text-gray-600">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-indigo-500">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-sm font-medium">Any time</span>
              </div>
            </label>
            <select
              value={filters.timeFilter}
              onChange={(e) => updateFilter('timeFilter', e.target.value as SearchFilters['timeFilter'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="any">Any time</option>
              <option value="today">Today</option>
              <option value="week">This week</option>
              <option value="month">This month</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              When was the event posted?
            </p>
          </div>

          <div>
            <label className="block mb-2">
              <div className="flex items-center gap-2 text-gray-600">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-indigo-500">
                  <path d="M8 2a4 4 0 00-4 4c0 3 4 8 4 8s4-5 4-8a4 4 0 00-4-4z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="8" cy="6" r="1.5" fill="currentColor" />
                </svg>
                <span className="text-sm font-medium">Locations</span>
              </div>
            </label>
            <select
              value={filters.locationFilter}
              onChange={(e) => updateFilter('locationFilter', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All locations</option>
              {availableLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Where do you want to go?
            </p>
          </div>

          <div>
            <label className="block mb-2">
              <div className="flex items-center gap-2 text-gray-600">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-indigo-500">
                  <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M2 6h12" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <span className="text-sm font-medium">Event types</span>
              </div>
            </label>
            <select
              value={filters.eventTypeFilter}
              onChange={(e) => updateFilter('eventTypeFilter', e.target.value as SearchFilters['eventTypeFilter'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All</option>
              <option value="social">Social</option>
              <option value="study">Study</option>
              <option value="sports">Sports</option>
              <option value="club">Club</option>
              <option value="entertainment">Entertainment</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              What type of event?
            </p>
          </div>

          <div>
            <label className="block mb-2">
              <div className="flex items-center gap-2 text-gray-600">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-indigo-500">
                  <path d="M8 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM3 13c0-2.5 2.5-4 5-4s5 1.5 5 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
                <span className="text-sm font-medium">Capacity</span>
              </div>
            </label>
            <select
              value={filters.capacityFilter}
              onChange={(e) => updateFilter('capacityFilter', e.target.value as SearchFilters['capacityFilter'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All</option>
              <option value="small">Small (1-20)</option>
              <option value="medium">Medium (21-50)</option>
              <option value="large">Large (51+)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Event size preference
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
