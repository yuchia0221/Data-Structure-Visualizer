const animations = [];

export function getQuickSortAnimations(array) {
    if (array.length <= 1) return array;
    QuickSortHelper(array, 0, array.length - 1);
    return animations;
}

function QuickSortHelper(arr, low, high) {
    if (low < high) {
        let pi = partition(arr, low, high, animations);
        QuickSortHelper(arr, low, pi - 1);
        QuickSortHelper(arr, pi + 1, high);
    }
}

const partition = (arr, low, high, animations) => {
    let pivot = arr[high]; // pivot
    let i = low - 1; // Index of smaller element and indicates the right position of pivot found so far
    for (let j = low; j <= high - 1; j++) {
        // If current element is smaller than the pivot
        animations.push([j, high, "color-change-start"]);
        animations.push([j, high, "color-change-revert"]);
        if (arr[j] < pivot) {
            i += 1; // increment index of smaller element
            //animation part
            animations.push([j, arr[i]], "height-change");
            animations.push([i, arr[j]], "height-change");
            // real sorting swap
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    animations.push([high, arr[i + 1]], "height-change");
    animations.push([i + 1, arr[high]], "height-change");

    let temp2 = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp2;
    return i + 1;
};

//
