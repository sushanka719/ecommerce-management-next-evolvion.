import { useEcommerce } from '../hooks/useEcommerce'

export default function SearchBar() {
  const { state, actions } = useEcommerce()
  const { ui, categories } = state

  return (
    <div className="searchBar">
      <input
        value={ui.search}
        onChange={(e) => actions.setSearch(e.target.value)}
        placeholder="Search products or categories"
        aria-label="Search products or categories"
      />
      <select
        value={ui.selectedCategoryId || ''}
        onChange={(e) => actions.setSelectedCategory(e.target.value || null)}
        aria-label="Filter by category"
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  )
}

