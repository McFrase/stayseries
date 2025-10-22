import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import properties from '@/data/properties.json';
import FiltersSidebar from '@/components/FiltersSidebar';
import PropertyCard from '@/components/PropertyCard';
import SearchBar from '@/components/SearchBar';
import Breadcrumbs from '@/components/Breadcrumbs';

function filterProperties(query) {
  if (!query) return properties;
  const lower = query.toLowerCase();
  return properties.filter(
    (property) =>
      property.city.toLowerCase().includes(lower) ||
      property.area.toLowerCase().includes(lower) ||
      property.name.toLowerCase().includes(lower),
  );
}

export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const query = params.get('q') || 'Lagos';

  const filtered = useMemo(() => filterProperties(query), [query]);
  const title = `${query.toUpperCase()}: ${filtered.length} PROPERTIES FOUND`;

  return (
    <div className="search-results">
      <section className="search-results__hero">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Nigeria', to: '/search?q=Nigeria' },
              { label: query },
            ]}
          />
          <SearchBar dense />
        </div>
      </section>

      <section className="search-results__body">
        <div className="container search-results__layout">
          <FiltersSidebar />
          <div className="search-results__list">
            <div className="search-results__header">
              <h2>{title}</h2>
              <label className="search-results__sort">
                Sort By:
                <select className="input" defaultValue="top-picks">
                  <option value="top-picks">Top Picks</option>
                  <option value="price-low">Price (lowest first)</option>
                  <option value="price-high">Price (highest first)</option>
                  <option value="rating">Guest rating</option>
                </select>
              </label>
            </div>
            <div className="search-results__cards">
              {filtered.map((property) => (
                <PropertyCard key={property.id} property={property} variant="list" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
