```js
import * as THREE from 'three';
import { octree } from 'd3-octree';

import findAllWithinRadius from './index.js';


const getters = {
    x: (d) => d.coords[0],
    y: (d) => d.coords[1],
    z: (d) => d.coords[2],
};

tree = octree()
    .x(getters.x)
    .y(getters.y)
    .z(getters.z);

const data = /* ... */;
tree.addAll(data);

/* ... */

const camera = new THREE.PerspectiveCamera(/* ... */);

/* ... */

const searchRadius = 50;
const results = findAllWithinRadius(
    tree,
    camera.position,
    searchRadius,
    getters,
);
/* returns a list of objects of shape { distance, data } */
```
