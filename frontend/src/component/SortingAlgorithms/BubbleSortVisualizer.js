export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    BubbleSortHelper(array, animations);
    return animations;
}

function BubbleSortHelper(mainArray, animations) {
    for (let i = 0; i < mainArray.length; i++) {
        for (let j = 0; j < mainArray.length - i - 1; j++) {
            animations.push([i, j, "color-change-start"]);
            animations.push([i, j, "color-change-revert"]);
            if (mainArray[j] > mainArray[j + 1]) {
                // animation part
                animations.push([j, mainArray[j + 1]], "height-change");
                animations.push([j + 1, mainArray[j]], "height-change");
                // real sorting part
                var temp = mainArray[j];
                mainArray[j] = mainArray[j + 1];
                mainArray[j + 1] = temp;
            }
        }
    }
}
