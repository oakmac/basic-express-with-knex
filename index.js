const express = require('express')
const app = express()

const dbConfigs = require('./knexfile.js')
const db = require('knex')(dbConfigs.development)

const port = 3000

// -----------------------------------------------------------------------------
// Express.js Endpoints

app.get('/', function (req, res) {
  getAllCohorts()
    .then(function (allCohorts) {
      // res.send('<pre>' + prettyPrintJSON(allCohorts) + '</pre>')
      res.send('<ul>' + allCohorts.map(renderCohort).join('') + '</ul>')
    })
})

app.get('/cohorts/:slug', function (req, res) {
  getOneCohort(req.params.slug)
    .then(function (cohorts) {
      if (cohorts.length === 1) {
        res.send('<pre>' + prettyPrintJSON(cohorts[0]) + '</pre>')
      } else {
        res.status(404).send('cohort not found :(')
      }
    })
})

app.listen(port, function () {
  console.log('Listening on port ' + port + ' 👍')
})

// -----------------------------------------------------------------------------
// Rendering

function renderCohort (cohort) {
  return `<li><a href="/cohorts/${cohort.slug}">${cohort.title}</a></li>`
}

// -----------------------------------------------------------------------------
// Database Queries

const getAllCohortsQuery = `
  SELECT *
  FROM Cohorts
`

function getAllCohorts () {
  return db.raw(getAllCohortsQuery)
}

function getOneCohort (slug) {
  return db.raw('SELECT * FROM Cohorts WHERE slug = ?', [slug])
}

// -----------------------------------------------------------------------------
// Misc

function prettyPrintJSON (x) {
  return JSON.stringify(x, null, 2)
}
