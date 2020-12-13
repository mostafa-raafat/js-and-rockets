import {prepareData, renderData} from './solution'

const filterParams = {
  year: 2018,
  customerName: 'NASA',
}

// example of run, you could leave it or modify however you want
fetch('https://api.spacexdata.com/v3/launches/past')
  .then(response => response.json())
  // there was a typo here i had to modify this method to currying version so it match unit-test.
  .then((data) => prepareData(filterParams)(data))
  .then(renderData)
