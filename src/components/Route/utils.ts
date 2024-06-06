import type {LngLat, DrawingStyle, Geometry} from '../../lib/ymaps';

export function findDistance(point1: LngLat, point2: LngLat) {
    const [x1, y1] = point1;
    const [x2, y2] = point2;

    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export function findNearestIndex(points: LngLat[], targetPoint: LngLat) {
    let nearestIndex = -1;
    let minDistance = Infinity;

    points.forEach((point, index) => {
        const distance = findDistance(point, targetPoint);

        if (distance < minDistance) {
            minDistance = distance;
            nearestIndex = index;
        }
    });

    return Math.max(nearestIndex, 0);
}

export function getFeatureCoordinates(points: LngLat[], separatingIndex: number, isRemainingRoute?: boolean) {
    if (separatingIndex === 0) {
        if (isRemainingRoute) {
            return points;
        } else {
            return [];
        }
    }

    if (separatingIndex === points.length - 1) {
        if (isRemainingRoute) {
            return [];
        } else {
            return points;
        }
    }

    if (isRemainingRoute) {
        return points.slice(separatingIndex);
    } else {
        return points.slice(0, separatingIndex);
    }
}

export function getFeatureGeometry(coordinates: LngLat[]): Geometry {
    return {
        type: 'LineString',
        coordinates
    };
}

export function getFeatureStyle(color: string): DrawingStyle {
    return {
        stroke: [
            {
                color,
                width: 8,
                opacity: 0.8
            }
        ],
        simplificationRate: 0
    };
}
