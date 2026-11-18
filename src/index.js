// Standalone public/index.html has no #root. Load React (and its CSS)
// only when the React shell is present, so the winter page is not restyled.
if (document.getElementById('root')) {
  import('./bootstrap');
}
