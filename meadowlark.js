const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000
const { getFortune } = require('./lib/fortune')


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
  res.render('about', { fortune: getFortune() })
}
)
app.get('/contact', (req, res)=> res.render('contact'))

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