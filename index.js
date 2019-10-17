import * as R from 'ramda';
import * as THREE from 'three';


const isLeafNode = (node) => !!node.data;
const sortByDistance = R.sortBy(R.prop('distance'));

const searchSphereBox = new THREE.Box3();
const octreeBox = new THREE.Box3();
const nodeVec = new THREE.Vector3();

const findAllWithinRadius = (tree, searchOrigin, searchRadius, getters) => {
	searchSphereBox.min.set(
		searchOrigin.x - searchRadius,
		searchOrigin.y - searchRadius,
		searchOrigin.z - searchRadius,
	);
	searchSphereBox.max.set(
		searchOrigin.x + searchRadius,
		searchOrigin.y + searchRadius,
		searchOrigin.z + searchRadius,
	);
	const results = [];
	tree.visit((node, x0, y0, z0, x1, y1, z1) => {
		if (!isLeafNode(node)) {
			octreeBox.min.set(x0, y0, z0);
			octreeBox.max.set(x1, y1, z1);
			const intersects = octreeBox.intersectsBox(searchSphereBox);
			if (!intersects) { 
				return true; 
			}
		} else {
			nodeVec.set(
				getters.x(node),
				getters.y(node),
				getters.z(node),
			);
			const d = nodeVec.distanceTo(searchOrigin);
			if (d <= searchRadius) {
				results.push({
					distance: d,
					data: node.data,
				});
			}
		}
	});
	return sortByDistance(results);
};

export default findAllWithinRadius