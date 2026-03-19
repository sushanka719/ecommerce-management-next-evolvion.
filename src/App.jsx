import { useState } from 'react'
import './App.css'
import { useEcommerce } from './hooks/useEcommerce'
import AddCategoryForm from './components/AddCategoryForm'
import AddProductForm from './components/AddProductForm'
import CategoryList from './components/CategoryList'
import SearchBar from './components/SearchBar'
import ProductCard from './components/ProductCard'
import WishList from './components/WishList'

function App() {
  const { state, actions } = useEcommerce()
  const { auth, categories, products, wishlist, ui } = state
  const { search, selectedCategoryId } = ui

  const categoryById = categories.reduce((acc, category) => {
    acc[category.id] = category
    return acc
  }, {})

  const normalized = (search ?? '').trim().toLowerCase()
  const filteredProducts = products
    .filter((product) => {
      if (selectedCategoryId && product.categoryId !== selectedCategoryId) {
        return false
      }
      if (!normalized) return true

      const categoryName = categoryById[product.categoryId]?.name ?? ''
      const matchName = product.name.toLowerCase().includes(normalized)
      const matchCategory = categoryName.toLowerCase().includes(normalized)
      return matchName || matchCategory
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    const trimmedName = username.trim()
    const trimmedPassword = password.trim()
    if (!trimmedName || !trimmedPassword) return
    actions.login({ name: trimmedName, password: trimmedPassword })
    setUsername('')
    setPassword('')
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Simple eCommerce Manager</h1>
        <div className="app__auth">
          {auth.isAuthenticated ? (
            <>
              <span className="app__user">Hello, {auth.user?.name}</span>
              <button className="button" type="button" onClick={() => actions.logout()}>
                Logout
              </button>
            </>
          ) : (
            <form className="app__login" onSubmit={handleLogin}>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name"
                aria-label="Your name"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                aria-label="Your password"
              />
              <button className="button" type="submit">
                Login
              </button>
            </form>
          )}
        </div>
      </header>

      <main className="app__main">
        <section className="app__panel">
          <h2>Categories</h2>
          <AddCategoryForm />
          <CategoryList />
        </section>

        <section className="app__panel">
          <div className="app__panelHeader">
            <h2>Products</h2>
            <SearchBar />
          </div>
          <AddProductForm />
          <div className="productGrid">
            {filteredProducts.length === 0 ? (
              <p className="app__empty">No products match the current filters.</p>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                />
              ))
            )}
          </div>
        </section>

        <section className="app__panel">
          <h2>Wishlist</h2>
          <WishList />
        </section>
      </main>
    </div>
  )
}

export default App
