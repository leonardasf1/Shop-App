import React from 'react'

export const Loader = () => (
<svg className="loading" xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" r="0" fill="none" stroke="#333" strokeWidth="2">
  <animate attributeName="r" repeatCount="indefinite" dur="2s" values="0;45" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-1s"></animate>
  <animate attributeName="opacity" repeatCount="indefinite" dur="2s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-1s"></animate>
</circle>
<circle cx="50" cy="50" r="0" fill="none" stroke="#46dff0" strokeWidth="2">
  <animate attributeName="r" repeatCount="indefinite" dur="2s" values="0;45" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline"></animate>
  <animate attributeName="opacity" repeatCount="indefinite" dur="2s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline"></animate>
</circle>
</svg>
)
// xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(255, 255, 255) none repeat scroll 0% 0%; display: block; shape-rendering: auto;"