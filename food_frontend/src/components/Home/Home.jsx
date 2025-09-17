import React, { useMemo, useState, useEffect } from 'react';
import '../../theme.css';
import '../../App.css';
import '../../assets/common.css';
import '../../assets/home-1-49.css';

// PUBLIC_INTERFACE
export default function Home() {
  /**
   * Home screen for the food browsing app.
   * Uses Ocean Professional theme with modern cards and a search bar.
   */
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState({});
  const categories = ['All', 'Combos', 'Sliders', 'Classic'];

  // Seed data mapped from the static HTML content
  const items = useMemo(
    () => [
      {
        id: 'cheese-wendy',
        title: "Cheeseburger Wendy's Burger",
        rating: 4.9,
        category: 'Classic',
        image: require('../../assets/figmaimages/figma_image_1_83.png'),
      },
      {
        id: 'veggie-burger',
        title: 'Hamburger\nVeggie Burger',
        rating: 4.8,
        category: 'Combos',
        image: require('../../assets/figmaimages/figma_image_1_92.png'),
      },
      {
        id: 'chicken-burger',
        title: 'Hamburger\nChicken Burger',
        rating: 4.6,
        category: 'Sliders',
        image: require('../../assets/figmaimages/figma_image_1_101.png'),
      },
      {
        id: 'fried-chicken-burger',
        title: 'Hamburger\nFried Chicken Burger',
        rating: 4.5,
        category: 'Classic',
        image: require('../../assets/figmaimages/figma_image_1_110.png'),
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const byQuery = (t) => t.toLowerCase().includes(query.trim().toLowerCase());
    return items.filter((it) => {
      const okCategory = activeCategory === 'All' || it.category === activeCategory;
      const okQuery = query.trim() === '' || byQuery(it.title.replace(/\n/g, ' '));
      return okCategory && okQuery;
    });
  }, [items, query, activeCategory]);

  // Accessibility tweaks ported from assets/app.js
  useEffect(() => {
    const svgs = document.querySelectorAll('svg');
    svgs.forEach((svg) => {
      svg.setAttribute('focusable', 'false');
      if (!svg.hasAttribute('aria-hidden') && !svg.getAttribute('aria-label')) {
        svg.setAttribute('aria-hidden', 'true');
      }
    });
  }, [query, activeCategory, filtered.length]);

  const toggleFav = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="container" aria-label="Food browser home">
      <Header />
      <Subheader />
      <SearchBar query={query} onChange={setQuery} />
      <CategoryChips
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />
      <FoodGrid items={filtered} favorites={favorites} onToggleFav={toggleFav} />
      <FloatingActionButton />
      <BottomNav />
    </main>
  );
}

function Header() {
  return (
    <div className="headerRow" style={{ marginTop: 6 }}>
      <div className="brand">
        <div>
          <div className="brandTitle">Foodgo</div>
        </div>
      </div>
      <div className="avatar" aria-hidden="true">
        <img
          src={require('../../assets/figmaimages/figma_image_1_54.png')}
          alt="Profile"
          width="56"
          height="56"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}

function Subheader() {
  return (
    <div className="brandSubtitle">Order your favourite food!</div>
  );
}

function SearchBar({ query, onChange }) {
  return (
    <div className="search" style={{ marginTop: 18 }}>
      <div className="searchInput card" role="search">
        <SearchIcon />
        <input
          aria-label="Search food"
          placeholder="Search"
          value={query}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <button className="filterButton btn" aria-label="Open filters">
        <SlidersIcon />
      </button>
    </div>
  );
}

function CategoryChips({ categories, active, onChange }) {
  return (
    <div className="categoryRow" style={{ marginTop: 18 }}>
      {categories.map((c) => (
        <button
          key={c}
          className={`chip ${active === c ? 'active' : ''}`}
          onClick={() => onChange(c)}
          aria-pressed={active === c}
          aria-label={`Category ${c}`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

function FoodGrid({ items, favorites, onToggleFav }) {
  return (
    <section aria-label="Food items" style={{ marginTop: 18 }}>
      <div className="grid">
        {items.map((it) => (
          <div key={it.id} className="gridItem">
            <FoodCard
              title={it.title}
              rating={it.rating}
              image={it.image}
              fav={!!favorites[it.id]}
              onToggleFav={() => onToggleFav(it.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function FoodCard({ title, rating, image, fav, onToggleFav }) {
  return (
    <article className="card foodCard" aria-label={`${title} card`}>
      <div className="foodCardImageWrap">
        <img src={image} alt={title.replace(/\n/g, ' ')} />
      </div>
      <div className="foodCardTitle">
        {title.split('\n').map((line, idx) => (
          <span key={idx}>
            {line}
            {idx < title.split('\n').length - 1 ? <br /> : null}
          </span>
        ))}
      </div>
      <div className="foodCardMeta" aria-label={`Rating ${rating}`}>
        <StarIcon color="var(--secondary)" />
        <span>{rating.toFixed(1)}</span>
      </div>
      <button
        className="heartBtn"
        aria-pressed={fav}
        aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        onClick={onToggleFav}
        title={fav ? 'Remove from favorites' : 'Add to favorites'}
      >
        <HeartIcon filled={fav} />
      </button>
    </article>
  );
}

function FloatingActionButton() {
  return (
    <div className="fabWrap">
      <div className="fab" role="button" aria-label="Add">
        <PlusIcon />
      </div>
    </div>
  );
}

function BottomNav() {
  return (
    <nav className="bottomNav" aria-label="Primary">
      <HomeIcon className="navIcon active" />
      <UserIcon className="navIcon" />
      <ChatIcon className="navIcon" />
    </nav>
  );
}

/* Icons */
function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" style={{ marginRight: 12 }}>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" fill="none"></circle>
      <line x1="16" y1="16" x2="22" y2="22" stroke="currentColor" strokeWidth="2"></line>
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="0" y="1" width="24" height="6.9" fill="currentColor"></rect>
      <rect x="0" y="8.5" width="24" height="7" fill="currentColor"></rect>
      <rect x="0" y="16.2" width="24" height="6.9" fill="currentColor"></rect>
    </svg>
  );
}

function StarIcon({ color = 'currentColor' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <polygon
        points="12,2 15,9 23,9 17,14 19,22 12,18 5,22 7,14 1,9 9,9"
        fill={color}
      ></polygon>
    </svg>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={{ color: 'var(--text)' }}>
      <path
        d="M12 21s-8-5.3-8-10.5C4 7 6 5 8.5 5c1.6 0 3 1 3.5 2 0.5-1 1.9-2 3.5-2C18 5 20 7 20 10.5 20 15.7 12 21 12 21z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
      ></path>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 16 16" aria-hidden="true">
      <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="3"></line>
      <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="3"></line>
    </svg>
  );
}

function HomeIcon({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l10 8h-3v10h-6V14H11v7H5V11H2z" fill="currentColor"></path>
    </svg>
  );
}

function UserIcon({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" fill="currentColor"></circle>
      <path d="M4 22c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="none" stroke="currentColor" strokeWidth="2"></path>
    </svg>
  );
}

function ChatIcon({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 3h18v14H7l-4 4V3z" fill="currentColor"></path>
      <rect x="8" y="7" width="8" height="2" fill="#ffffff"></rect>
      <rect x="8" y="11" width="12" height="2" fill="#ffffff"></rect>
    </svg>
  );
}
