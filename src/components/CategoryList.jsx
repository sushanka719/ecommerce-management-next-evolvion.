import React from 'react'
import { useEcommerce } from '../hooks/useEcommerce'
import CategoryCard from './CategoryCard.jsx'

export default function CategoryList() {
    const { state, actions } = useEcommerce()
    const { categories, ui } = state

    if (!categories.length) {
        return <p className="app__empty">No categories yet. Add one to get started.</p>
    }

    return (
        <div className="categoryList">
            {categories.map((category) => (
                <CategoryCard
                    key={category.id}
                    category={category}
                    selected={ui.selectedCategoryId === category.id}
                    onSelect={actions.setSelectedCategory}
                    onDelete={actions.deleteCategory}
                />
            ))}
        </div>
    )
}

