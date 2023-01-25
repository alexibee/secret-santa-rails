import mapboxgl from 'mapbox-gl';

const mboxAccessToken = process.env.REACT_APP_MBOX_TOKEN;
const mapBox = mapboxgl;
mapBox.accessToken = mboxAccessToken;

export { mapBox };
