const express = require('express')
const app = express()

const dbConfigs = require('./knexfile.js')
const db = require('knex')(dbConfigs.development)

const port = 3000

app.get('/', function (req, res) {
  getAllCohorts()
    .then(function (allCohorts) {
      // res.send('<pre>' + JSON.stringify(allCohorts, null, 4) + '</pre>')
      res.send('<ul>' + allCohorts.map(renderCohort).join('') + '</ul>')
    })
})

app.listen(port, function () {
  console.log('Listening on port ' + port + ' 👍')
})

function renderCohort (cohort) {
  return `
    <li><a href="/cohorts/${cohort.slug}">${cohort.title}</a></li>
  `
}













// -----------------------------------------------------
// Database Stuff

const getAllCohortsQuery = `
  SELECT *
  FROM Cohorts
`

function getAllCohorts () {
  return db.raw(getAllCohortsQuery)
}

// Using the knex.js query builder syntax:
// db('Cohorts')
//   // .where({ isActive: true })
//   .then(function (cohorts) {
//     console.log(cohorts)
//   })
