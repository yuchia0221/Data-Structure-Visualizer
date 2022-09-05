export function getGnomeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    GnomeSortHelper(array, animations);
    return animations;
}

function GnomeSortHelper(arr, animations) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        animations.push([i, i-1, "color-change-start"]);
        animations.push([i, i-1, "color-change-revert"]);
        if (arr[i-1] > arr[i]) {
            for( let k = i; k > 0; k--){
                animations.push([k, k-1, "color-change-start"]);
                animations.push([k, k-1, "color-change-revert"]);
                if (arr[k-1] > arr[k]) {
                    animations.push([k, arr[k-1]], "height-change");
                    animations.push([k-1, arr[k]], "height-change");
                    let t = arr[k];
                    arr[k] = arr[k-1];
                    arr[k-1] = t;
                }
                
            }
        }
    }
}