export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    HeapSortHelper(array, animations);
    return animations;
}

function HeapSortHelper(arr, animations) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        animations.push([i, parseInt((i - 1) / 2), "color-change-start"]);
        animations.push([i, parseInt((i - 1) / 2), "color-change-revert"]);
        if (arr[i] > arr[parseInt((i - 1) / 2)]) {
            let j = i;
            // swap child and parent until
            // parent is smaller
            while (arr[j] > arr[parseInt((j - 1) / 2)]) {
                // animation part
                animations.push([j, arr[parseInt((j - 1) / 2)]], "height-change");
                animations.push([parseInt((j - 1) / 2), arr[j]], "height-change");
                // swap
                let temp = arr[j];
                arr[j] = arr[parseInt((j - 1) / 2)];
                arr[parseInt((j - 1) / 2)] = temp;
                // continue
                j = parseInt((j - 1) / 2);
            }
        }
    }

    for (let i = n - 1; i > 0; i--) {
        animations.push([0, arr[i]], "height-change");
        animations.push([i, arr[0]], "height-change");
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        // maintaining heap property
        // after each swapping
        let j = 0;
        let index;

        do {
            index = 2 * j + 1;
            // if left child is smaller than
            // right child point index variable
            // to right child
            if (index >= n - 1) break;
            // animation
            animations.push([index, index + 1, "color-change-start"]);
            animations.push([index, index + 1, "color-change-revert"]);
            if (arr[index] < arr[index + 1] && index < i - 1) index++;
            // if parent is smaller than child
            // then swapping parent with child
            // having higher value
            animations.push([j, index, "color-change-start"]);
            animations.push([j, index, "color-change-revert"]);

            if (arr[j] < arr[index] && index < i) {
                animations.push([j, arr[index]], "height-change");
                animations.push([index, arr[j]], "height-change");
                let temp2 = arr[j];
                arr[j] = arr[index];
                arr[index] = temp2;
            }
            j = index;
        } while (index < i);
    }
}
