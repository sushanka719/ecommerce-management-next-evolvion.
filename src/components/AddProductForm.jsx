import { useState } from 'react'
import { useEcommerce } from '../hooks/useEcommerce'

export default function AddProductForm() {
  const { state, actions } = useEcommerce()
  const { categories } = state

  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [price, setPrice] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = name.trim()
    const selectedCategoryId = categoryId || categories[0]?.id
    if (!trimmed || !selectedCategoryId) return
    actions.addProduct({ name: trimmed, categoryId: selectedCategoryId, price: Number(price) || 0 })
    setName('')
    setPrice('')
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product name"
        aria-label="Product name"
      />
      <select
        value={categoryId || categories[0]?.id || ''}
        onChange={(e) => setCategoryId(e.target.value)}
        aria-label="Category"
      >
        <option value="" disabled>
          Select category
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
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
        aria-label="Price"
      />
      <button className="button" type="submit" disabled={!categories.length}>
        Add product
      </button>
    </form>
  )
}

