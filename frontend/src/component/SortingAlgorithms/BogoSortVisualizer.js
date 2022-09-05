export function getBogoSortAnimations(array) {
    const animations = [];
    const counter = 100;
    if (array.length <= 1) return array;
    BogoSortHelper(array, animations, counter);
    return animations;
}

const isSorted = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] > arr[i]) {
            return false;
        }
    }
    return true;
};

function BogoSortHelper(arr, animations, counter) {
    let sorted = false;
    while (sorted === false && counter > 0) {
        //shuffle
        for (let i = arr.length - 1; i; i--) {
            let m = Math.floor(Math.random() * i);
            let n = arr[i - 1];
            animations.push([i - 1, arr[m]], "height-change");
            animations.push([m, n], "height-change");
            arr[i - 1] = arr[m];
            arr[m] = n;
        }
        sorted = isSorted(arr);
        counter -= 1;
    }
}
