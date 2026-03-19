import { useState } from 'react'
import { useEcommerce } from '../hooks/useEcommerce'

export default function ProductCard({ product, isWishlisted }) {
  const { state, actions } = useEcommerce()
  const { categories, auth } = state
  const category = categories.find((c) => c.id === product.categoryId)

  const [showDetails, setShowDetails] = useState(false)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(product.name)
  const [price, setPrice] = useState(String(product.price ?? ''))
  const [categoryId, setCategoryId] = useState(product.categoryId || '')

  const handleSave = () => {
    const trimmed = name.trim()
    if (!trimmed || !categoryId) return
    actions.editProduct({
      id: product.id,
      name: trimmed,
      price: Number(price) || 0,
      categoryId,
    })
    setEditing(false)
  }

  const handleToggleWishlist = (e) => {
    e.stopPropagation()
    actions.toggleWishlist(product.id)
  }

  return (
    <div className="productCard" onClick={() => setShowDetails((prev) => !prev)}>
      <div className="productCard__header">
        {editing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="productCard__input"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <button
            type="button"
            className="productCard__title"
            onClick={(e) => {
              e.stopPropagation()
              setShowDetails((prev) => !prev)
            }}
          >
            {product.name} (view details)
          </button>
        )}
        <div className="productCard__actions">
          {editing ? (
            <>
              <button
                type="button"
                className="button button--mini"
                onClick={(e) => {
                  e.stopPropagation()
                  handleSave()
                }}
              >
                Save
              </button>
              <button
                type="button"
                className="button button--mini"
                onClick={(e) => {
                  e.stopPropagation()
                  setEditing(false)
                  setName(product.name)
                  setPrice(String(product.price ?? ''))
                  setCategoryId(product.categoryId)
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="button button--mini"
                onClick={(e) => {
                  e.stopPropagation()
                  setEditing(true)
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="button button--mini"
                onClick={(e) => {
                  e.stopPropagation()
                  actions.deleteProduct(product.id)
                }}
                aria-label={`Delete ${product.name}`}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {showDetails ? (
        <div className="productCard__details">
          {editing ? (
            <>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                aria-label="Category"
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                type="number"
                min="0"
                step="0.01"
                onClick={(e) => e.stopPropagation()}
              />
            </>
          ) : (
            <>
              <span className="productCard__meta">Category: {category?.name ?? 'Uncategorized'}</span>
              <span className="productCard__meta">Price: ${Number(product.price).toFixed(2)}</span>
              <span className="productCard__meta">ID: {product.id}</span>
            </>
          )}
        </div>
      ) : null}

      <button
        type="button"
        className="button button--secondary"
        onClick={handleToggleWishlist}
        disabled={!auth.isAuthenticated}
      >
        {isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      </button>
      {!auth.isAuthenticated ? (
        <p className="productCard__note">Login to manage your wishlist.</p>
      ) : null}
    </div>
  )
}

