import { useEcommerce } from '../hooks/useEcommerce'

export default function WishList() {
  const { state, actions } = useEcommerce()
  const { auth, products, categories, wishlist } = state

  if (!auth.isAuthenticated) {
    return <p className="app__empty">Login to see your wishlist.</p>
  }

  const wishlistedProducts = products.filter((product) => wishlist.includes(product.id))

  if (!wishlistedProducts.length) {
    return <p className="app__empty">Your wishlist is empty.</p>
  }

  const getCategoryName = (id) => categories.find((c) => c.id === id)?.name ?? 'Uncategorized'

  return (
    <div className="wishList">
      {wishlistedProducts.map((product) => (
        <div key={product.id} className="wishList__item">
          <div>
            <strong>{product.name}</strong>
            <div className="wishList__meta">
              <span>{getCategoryName(product.categoryId)}</span>
              <span>${Number(product.price).toFixed(2)}</span>
            </div>
          </div>
          <button
            type="button"
            className="button button--mini"
            onClick={() => actions.toggleWishlist(product.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}

