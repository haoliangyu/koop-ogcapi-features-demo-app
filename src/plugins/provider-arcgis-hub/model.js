const fetch = require('node-fetch')
const itemRegex = new RegExp(/^([a-z]|[0-9]){32}$/i);
const datasetRegex = new RegExp(/^([a-z]|[0-9]){32}_[0-9]+$/i);

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
      host
    }
  } = req;

  try {
    let datasetId = host;

    if (isSlug(datasetId)) {
      datasetId = await getDatasetIdFromSlug(datasetId);
    }

    const response = await fetch(`https://hub.arcgis.com/datasets/${datasetId}.geojson`);

    if (!response.ok) {
      return callback(new Error(response.statusText))
    }

    const result = await response.json()
    callback(null, result);
  } catch (error) {
    callback(error)
  }
}

function isSlug (id) {
  return !itemRegex.test(id) && !datasetRegex.test(id);
}

async function getDatasetIdFromSlug (slug) {
  const response = await fetch(`https://opendata.arcgis.com/api/v3/datasets?filter[slug]=${slug}&fields[datasets]=id`);

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const result = await response.json()

  if (result.data.length === 0) {
    throw new Error('Slug not found')
  }

  return result.data[0].id
}

module.exports = Model
