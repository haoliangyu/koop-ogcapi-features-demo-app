const providerArcgisHub = require('./plugins/provider-arcgis-hub');
const outputOgcapiFeatures = require('@koopjs/output-ogcapi-features');
const providerOgcapiFeatures = require('@koopjs/provider-ogcapi-features');
const outputs = [{
  instance: outputOgcapiFeatures
}];
const auths = [];
const caches = [];
const plugins = [{
  instance: providerOgcapiFeatures
}, {
  instance: providerArcgisHub
}];
module.exports = [...outputs, ...auths, ...caches, ...plugins];