const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000

const fortunes = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.", 
  "Do not fear what you don't know.", 
  "You will have a pleasant surprise.", 
  "Whenever possible, keep it simple.",
]

// middleware
app.use(express.static(__dirname + '/public'))

// settin up handlebars
app.engine('handlebars', engine({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
  res.render('about', {fortune: randomFortune})
})

app.use((req, res) => {
  res.type('text/plain')
  res.status(404)
  res.send('404 = Not Found')
})

app.use((err, req, res, next) => {
  console.error(err.message)
  res.type('text/plain')
  res.status(500)
  res.send('500 - Server Error')
})

app.listen(port, () => {
  console.log(`Express started on http://localhost:${port}`)
})