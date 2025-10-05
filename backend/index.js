require('dotenv').config();
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

const expenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  note: String,
  date: String
})
const Expense = mongoose.model('Expense', expenseSchema)

app.get('/expenses', async (req, res) => {
  const expenses = await Expense.find()
  res.json(expenses)
})

app.post('/expenses', async (req, res) => {
  const { title, amount, note, date } = req.body
  const expense = new Expense({ title, amount, note, date })
  await expense.save()
  res.json(expense)
})

app.put('/expenses/:id', async (req, res) => {
  const { id } = req.params
  const { title, amount, note, date } = req.body
  const updated = await Expense.findByIdAndUpdate(
    id,
    { title, amount, note, date },
    { new: true }
  )
  res.json(updated)
})

app.delete('/expenses/:id', async (req, res) => {
  const { id } = req.params
  await Expense.findByIdAndDelete(id)
  res.json({ message: 'Deleted successfully' })
})


const connected = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected ")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
    await connected()
    console.log(`Server running in port ${PORT}`)
})