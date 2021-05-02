app.get('/sighting/:id', async (req, res) => {
    res.send(await sightingData.findById(req.params.id))
  })
  
//   app.get('/sightings/state/:state', async (req, res) => {
//     res.send(await sightingData.findByState(req.params.state))
//   })
  
//   app.get('/sightings/county/:county/state/:state', async (req, res) => {
//     res.send(await sightingData.findByCountyState(req.params.county, req.params.state))
//   })
  
//   app.get('/sightings/containing/:text', async (req, res) => {
//     res.send(await sightingData.findContaining(req.params.text))
//   })
  
//   app.get('/sightings/state/:state/containing/:text', async (req, res) => {
//     res.send(await sightingData.findByStateContaining(req.params.state, req.params.text))
//   })
  
//   app.get('/sightings/near/lat/:latitude/long/:longitude/within/:radius/mi', async (req, res) => {
//     res.send(await sightingData.findNear(req.params.latitude, req.params.longitude, req.params.radius, 'mi'))
//   })
  
//   app.get('/sightings/near/lat/:latitude/long/:longitude/within/:radius/km', async (req, res) => {
//     res.send(await sightingData.findNear(req.params.latitude, req.params.longitude, req.params.radius, 'km'))
//   })