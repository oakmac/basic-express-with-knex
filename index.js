const fs = require('fs')
const mustache = require('mustache')

const express = require('express')
const app = express()

const log = require('./src/logging.js')
const {createCohort, getAllCohorts, getOneCohort} = require('./src/db/cohorts.js')

const port = 3000

// -----------------------------------------------------------------------------
// Express.js Endpoints

const homepageTemplate = fs.readFileSync('./templates/homepage.mustache', 'utf8')

app.use(express.urlencoded())

app.get('/', function (req, res) {
  getAllCohorts()
    .then(function (allCohorts) {
      res.send(mustache.render(homepageTemplate, { cohortsListHTML: renderAllCohorts(allCohorts) }))
    })
})

function slugify (str) {
  return str.toLowerCase()
            .replace(/\s+/g, '-')
}

console.assert('abc-xyz' === slugify('Abc Xyz'))
console.assert('aaa-bbb' === slugify('AAA      BBB'))

app.post('/cohorts', function (req, res) {
  const cohortTitle = req.body.title
  let slug = req.body.slug
  if (slug === '') {
    slug = slugify(cohortTitle)
  }

  const newCohort = {
    title: cohortTitle,
    slug: slug
  }

  createCohort(newCohort)
    .then(function () {
      res.send('hopefully we created your cohort <a href="/">go home</a>')
    })
    .catch(function () {
      res.status(500).send('something went wrong. waaah, waaah')
    })
})

app.get('/cohorts/:slug', function (req, res) {
  getOneCohort(req.params.slug)
    .then(function (cohort) {
      res.send('<pre>' + prettyPrintJSON(cohort) + '</pre>')
    })
    .catch(function (err) {
      res.status(404).send('cohort not found :(')
    })
})

app.listen(port, function () {
  log.info('Listening on port ' + port + ' 👍')
})

// -----------------------------------------------------------------------------
// HTML Rendering

function renderCohort (cohort) {
  return `<li><a href="/cohorts/${cohort.slug}">${cohort.title}</a></li>`
}

function renderAllCohorts (allCohorts) {
  return '<ul>' + allCohorts.map(renderCohort).join('') + '</ul>'
}

// -----------------------------------------------------------------------------
// Misc

function prettyPrintJSON (x) {
  return JSON.stringify(x, null, 2)
}
