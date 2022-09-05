export function getSelectionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    SelectionSortHelper(array, animations);
    return animations;
}

function SelectionSortHelper(array, animations) {
    for (let i = 0; i < array.length; i++) {
        //set min to the current iteration of i
        let min = i;
        for (let j = i + 1; j < array.length; j++) {
            animations.push([min, j, "color-change-start"]);
            animations.push([min, j, "color-change-revert"]);
            if (array[j] < array[min]) {
                min = j;
            }
        }
        animations.push([i, array[min]], "height-change");
        animations.push([min, array[i]], "height-change");
        let temp = array[i];
        array[i] = array[min];
        array[min] = temp;
    }
}
