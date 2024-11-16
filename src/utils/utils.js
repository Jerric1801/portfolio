export function calculateIntersectionArea(rect1, rect2) {
    const xOverlap = Math.max(0, Math.min(rect1.left + rect1.width, rect2.left + rect2.width) - Math.max(rect1.left, rect2.left));
    const yOverlap = Math.max(0, Math.min(rect1.top + rect1.height, rect2.top + rect2.height) - Math.max(rect1.top, rect2.top));
    const overlapArea = xOverlap * yOverlap;
    return overlapArea;
}

export function hasClassInArray(item, classArray) {
    // Use the classList property to access an item's classes
    for (const className of item.classList) {
        if (classArray.includes(className)) {
            return true;
        }
    }
    return false;
}
