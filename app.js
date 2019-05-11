import express from 'express';
import Themeparks from 'themeparks';

const parksObjects = Themeparks.Parks

const parks = {
  magic_kingdom: new parksObjects.WaltDisneyWorldMagicKingdom(),
  animal_kingdom: new parksObjects.WaltDisneyWorldAnimalKingdom(),
  epcot: new parksObjects.WaltDisneyWorldEpcot(),
  hollywood_studios: new parksObjects.WaltDisneyWorldHollywoodStudios(),
  universal_studios: new parksObjects.UniversalStudiosFlorida(),
  islands_of_adventure: new parksObjects.UniversalIslandsOfAdventure()
}

const app = express();

const router = express.Router()

router.get('/', (req, res) => res.statis(200).send({ success: 'true', message: 'API active' }))

router.get(`/parks/:park_name/attractions`, (req, res) => {
  const parkName = req.params.park_name
  const park = parks[parkName];
  if(!park) return res.status(404).send({
    success: false,
    message: 'Park not found'
  })
  else park.GetWaitTimes((err, rides) => {
    if(err) return res.status(404).send({
      success: false,
      message: err
    })
    else return res.status(200).send({
      success: true,
      message: `${parkName} attractions received`,
      attractions: rides
    })
  })
})

app.use('/api', router)

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})