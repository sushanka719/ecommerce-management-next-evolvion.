import { useState } from 'react'
import { useEcommerce } from '../hooks/useEcommerce'

export default function AddCategoryForm() {
    const [name, setName] = useState('')
    const { actions } = useEcommerce()

    const handleSubmit = (event) => {
        event.preventDefault()
        const trimmed = name.trim()
        if (!trimmed) return
        actions.addCategory(trimmed)
        setName('')
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="New category"
                aria-label="New category"
            />
            <button className="button" type="submit">
                Add
            </button>
        </form>
    )
}

