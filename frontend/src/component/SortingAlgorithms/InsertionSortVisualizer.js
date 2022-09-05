export function getInsertionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    InsertionSortHelper(array, animations);
    return animations;
}

function InsertionSortHelper(arr, animations) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let current = arr[i];
        let j = i - 1;
        while (j > -1 && current < arr[j]) {
            animations.push([j, i, "color-change-start"]);
            animations.push([j, i, "color-change-revert"]);

            animations.push([j + 1, arr[j]], "height-change");

            arr[j + 1] = arr[j];
            j--;
        }
        animations.push([j + 1, current], "height-change");
        arr[j + 1] = current;
    }
}
