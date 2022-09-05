export function getCocktailShakerSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    CocktailShakerSortHelper(array, animations);
    return animations;
}

function CocktailShakerSortHelper(arr, animations) {
    let max = arr.length - 1;
    let min = 0;
    while(min < max){
        let biggest = min;
        let smallest = max;
        //
        for (let i = min; i <= max; i++) {
            animations.push([i, biggest, "color-change-start"]);
            animations.push([i, biggest, "color-change-revert"]);
            if(arr[biggest] < arr[i]) biggest = i;
        }
            
        if(max !== biggest){ //swap the items
            animations.push([max, arr[biggest]], "height-change");
            animations.push([biggest, arr[max]], "height-change");
            let aux = arr[max]; arr[max] = arr[biggest]; arr[biggest] = aux;
        }
        max--;

        for (let j = max; j >= min; j--) {
            if(arr[smallest] > arr[j]) smallest = j;
            animations.push([j, smallest, "color-change-start"]);
            animations.push([j, smallest, "color-change-revert"]);
        }
        if(min !== smallest){ //swap the items
            animations.push([min, arr[smallest]], "height-change");
            animations.push([smallest, arr[min]], "height-change");
            let aux2 = arr[min]; arr[min] = arr[smallest]; arr[smallest] = aux2;
        }
        min++;
    }  
}

