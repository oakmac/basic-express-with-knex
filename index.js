const fs = require('fs')
const mustache = require('mustache')

const express = require('express')
const app = express()

const dbConfigs = require('./knexfile.js')
const db = require('knex')(dbConfigs.development)

const port = 3000

// -----------------------------------------------------------------------------
// Express.js Endpoints

const homepageTemplate = fs.readFileSync('./templates/homepage.mustache', 'utf8')

app.get('/', function (req, res) {
  getAllCohorts()
    .then(function (allCohorts) {
      res.send(mustache.render(homepageTemplate, {cohortsListHTML: renderAllCohorts(allCohorts)}))
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
  console.log('Listening on port ' + port + ' 👍')
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
         .then(function (results) {
           if (results.length !== 1) {
             throw null
           } else {
             return results[0]
           }
         })
}

// -----------------------------------------------------------------------------
// Misc

function prettyPrintJSON (x) {
  return JSON.stringify(x, null, 2)
}
