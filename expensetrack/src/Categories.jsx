import React, { useState, useEffect } from 'react'

const Categories = () => {
    const [title, SetTitle] = useState("")
    const [amount, SetAmount] = useState("")
    const [date, SetDate] = useState("")
    const [note, SetNote] = useState("")
    const [category, SetCategory] = useState([])
    const [editId, SetEditId] = useState(null)
    const [error, SetError] = useState("")

    const [filterCategory, SetFilterCategory] = useState("")
    const [filterStartDate, SetFilterStartDate] = useState("")
    const [filterEndDate, SetFilterEndDate] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title.trim()) {
            SetError("Category title is required")
            return
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            SetError("Please enter a valid amount")
            return
        }
        if (!date) {
            SetError("Date is required")
            return
        }
        SetError("")

        const newCategory = { title, amount, note, date };

        if (editId) {
            SetCategory(
                category.map((cat) =>
                    cat._id === editId ? { ...cat, title, amount, note, date } : cat
                )
            );
            await fetch(`https://per-expensetracker.onrender.com/expenses/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCategory)
            });
            SetEditId(null);
        } else {
            const res = await fetch("https://per-expensetracker.onrender.com/expenses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCategory)
            });
            const savedCategory = await res.json();
            SetCategory([...category, savedCategory]);
        }

        SetTitle("")
        SetAmount("")
        SetNote("")
        SetDate("")
    }

    const handleDelete = async (_id) => {
        try {
            await fetch(`https://per-expensetracker.onrender.com/expenses/${_id}`, {
                method: "DELETE"
            });
            SetCategory(category.filter((cat) => cat._id !== _id));
        } catch (error) {
            console.error("Failed to delete", error);
        }
    }

    const handleEdit = (cat) => {
        SetAmount(cat.amount)
        SetTitle(cat.title)
        SetNote(cat.note)
        SetDate(cat.date)
        SetEditId(cat._id)
    }

    const filteredExpenses = category.filter((cat) => {
        const matchesCategory = filterCategory
            ? cat.title.toLowerCase().includes(filterCategory.toLowerCase())
            : true
        const matchesStart = filterStartDate
            ? new Date(cat.date) >= new Date(filterStartDate)
            : true
        const matchesEnd = filterEndDate
            ? new Date(cat.date) <= new Date(filterEndDate)
            : true
        return matchesCategory && matchesStart && matchesEnd
    })

    useEffect(() => {
        fetch('https://per-expensetracker.onrender.com/expenses')
            .then(res => res.json())
            .then(data => SetCategory(data))
    }, [])

    return (
        <div className='py-12'>
            {error && <p className="text-red-600 font-medium mb-5">{error}</p>}
            <div className='flex flex-row gap-12'>
                <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-6 pb-10 w-1/2'>
                    <input
                        type='text'
                        value={title}
                        placeholder='Category'
                        onChange={(e) => SetTitle(e.target.value)}
                        className='outline-none bg-white px-5 py-3 '
                    />
                    <input
                        type='text'
                        value={amount}
                        placeholder='Amount'
                        onChange={(e) => SetAmount(e.target.value)}
                        className='outline-none bg-white px-5 py-3'
                    />
                    <input
                        type='text'
                        value={note}
                        placeholder='Note'
                        onChange={(e) => SetNote(e.target.value)}
                        className='outline-none bg-white px-5 py-3'
                    />
                    <input
                        type='date'
                        value={date}
                        placeholder='Date'
                        onChange={(e) => SetDate(e.target.value)}
                        className='outline-none bg-white px-5 py-3'
                    />
                    <button type='submit' className='bg-blue-600 text-white px-5 py-3 rounded w-24 cursor-pointer'>
                        {editId ? "Update" : "Add"}
                    </button>
                </form>
                <hr className='border-2 h-48' />
                <div className='flex flex-col'>
                    <div className="grid grid-cols-2 gap-6 pb-6">
                        <input
                            type="text"
                            placeholder="Filter by category"
                            value={filterCategory}
                            onChange={(e) => SetFilterCategory(e.target.value)}
                            className="outline-none bg-white px-5 py-3 w-64"
                        />
                        <input
                            type="date"
                            value={filterStartDate}
                            onChange={(e) => SetFilterStartDate(e.target.value)}
                            className="outline-none bg-white px-5 py-3 w-64"
                        />
                        <input
                            type="date"
                            value={filterEndDate}
                            onChange={(e) => SetFilterEndDate(e.target.value)}
                            className="outline-none bg-white px-5 py-3 w-64"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => {
                                SetFilterCategory("")
                                SetFilterStartDate("")
                                SetFilterEndDate("")
                            }}
                            className="bg-blue-600 w-28 text-white px-5 py-3 rounded cursor-pointer"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
            <div className='py-10 bg-amber-200 shadow-2xl px-6 rounded-xl'>
                {
                    filteredExpenses.length > 0 ? (
                        filteredExpenses.map((cat) => (
                            <div key={cat._id} className='grid grid-cols-5 mb-6 shadow-xl items-center bg-red-100 px-5 py-3 rounded'>
                                <p className='text-2xl font-bold uppercase'>{cat.title}</p>
                                <p className='text-2xl'>₹ {cat.amount}</p>
                                <p className='text-xl'>{cat.note}</p>
                                <p className='text-2xl'>{cat.date}</p>
                                <div className='flex gap-5 ml-auto'>
                                    <button
                                        onClick={() => handleEdit(cat)}
                                        className='bg-yellow-500 text-white px-5 py-3 rounded w-24 cursor-pointer'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cat._id)}
                                        className='bg-red-600 text-white px-5 py-3 rounded w-24 cursor-pointer'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-xl text-center'>No categories added yet.</p>
                    )
                }
            </div>
        </div>
    )
}

export default Categories
