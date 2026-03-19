import { useState } from 'react'
import { useEcommerce } from '../hooks/useEcommerce'

export default function CategoryCard({ category, selected, onSelect, onDelete }) {
    const { actions } = useEcommerce()
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState(category.name)

    const handleSave = () => {
        const trimmed = name.trim()
        if (!trimmed) return
        actions.editCategory(category.id, trimmed)
        setEditing(false)
    }

    return (
        <div className={`categoryCard ${selected ? 'categoryCard--selected' : ''}`}>
            {editing ? (
                <div className="categoryCard__edit">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-label="Edit category name"
                    />
                    <button type="button" className="button button--mini" onClick={handleSave}>
                        Save
                    </button>
                    <button
                        type="button"
                        className="button button--mini"
                        onClick={() => {
                            setEditing(false)
                            setName(category.name)
                        }}
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <>
                    <button
                        type="button"
                        className="categoryCard__name"
                        onClick={() => onSelect(category.id)}
                    >
                        {category.name}
                    </button>
                    <button
                        type="button"
                        className="button button--mini"
                        onClick={() => setEditing(true)}
                        aria-label={`Edit category ${category.name}`}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="categoryCard__delete"
                        aria-label={`Delete category ${category.name}`}
                        onClick={() => onDelete(category.id)}
                    >
                        ✕
                    </button>
                </>
            )}
        </div>
    )
}

