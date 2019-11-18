const fetch = require('node-fetch')

function Model (koop) {}

// Public function to return data from the
// Return: GeoJSON FeatureCollection
//
// Config parameters (config/default.json)
// req.
//
// URL path parameters:
// req.params.host (if index.js:hosts true)
// req.params.id  (if index.js:disableIdParam false)
// req.params.layer
// req.params.method
Model.prototype.getData = async function (req, callback) {
  const {
    params: {
      host,
      id
    },
    query: {
      token
    }
  } = req;

  try {
    const itemId = host;
    const agolUrl = new URL(`https://www.arcgis.com/sharing/rest/content/items/${itemId}?f=json`)

    if (token) {
      agolUrl.searchParams.set('token', token);
    }

    const agolResponse = await fetch(agolUrl.href);

    if (!agolResponse.ok) {
      return callback(new Error(agolResponse.statusText))
    }

    const item = await agolResponse.json()
    const itemServiceUrl = new URL(`${item.url}/${id}/query?where=1=1&f=geojson&&outSR=4326`)

    if (token) {
      itemServiceUrl.searchParams.set('token', token);
    }

    const serviceResponse = await fetch(itemServiceUrl.href);

    if (!serviceResponse.ok) {
      return callback(new Error(serviceResponse.statusText))
    }

    const data = await serviceResponse.json()

    // a temporary fix for the invalid output from agol
    data.features.forEach((feature) => {
      if (!feature.properties) {
        feature.properties = {};
      }
    })

    callback(null, data);
  } catch (error) {
    callback(error)
  }
}

module.exports = Model
