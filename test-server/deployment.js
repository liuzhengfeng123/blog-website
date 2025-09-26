import express from 'express'
import path from 'path'
import open from 'open'

const app = express()
const PORT = 9000

app.use(express.static(path.resolve(import.meta.dirname, '../dist')))

app.listen(PORT, () => {
  console.log(`server has been listened to ${PORT} port.`)
  open(`http://localhost:${PORT}`)
})