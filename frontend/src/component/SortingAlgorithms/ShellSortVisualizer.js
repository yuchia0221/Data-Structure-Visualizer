export function getShellSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    ShellSortHelper(array, animations);
    return animations;
}

function ShellSortHelper(arr, animations) {
    let len = arr.length;
    let gapSize = parseInt(len / 2);
    while (gapSize > 0) {
        for (var i = gapSize; i < len; i++) {
            let temp = arr[i];
            let j = i;
            while (j >= gapSize && arr[j - gapSize] > temp) {
                animations.push([j, i, "color-change-start"]);
                animations.push([j, i, "color-change-revert"]);

                animations.push([j, arr[j - gapSize]], "height-change");

                arr[j] = arr[j - gapSize];
                j -= gapSize;
            }

            animations.push([j, temp], "height-change");
            arr[j] = temp;
        }
        gapSize = Math.floor(gapSize / 2);
    }
}
