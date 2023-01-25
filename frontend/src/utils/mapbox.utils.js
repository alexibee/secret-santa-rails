import mapboxgl from 'mapbox-gl';

const mboxAccessToken = process.env.REACT_APP_MBOX_TOKEN;
mapboxgl.accessToken = mboxAccessToken;

export const mapBox = mapboxgl;
