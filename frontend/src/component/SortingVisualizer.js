import React, { useState, useEffect } from "react";
import { getMergeSortAnimations } from "./SortingAlgorithms/MergeSortVisualizer.js";
import { getBubbleSortAnimations } from "./SortingAlgorithms/BubbleSortVisualizer.js";
import { getHeapSortAnimations } from "./SortingAlgorithms/HeapSortVisualizer.js";
import { getQuickSortAnimations } from "./SortingAlgorithms/QuickSortVisualizer.js";
import { getSelectionSortAnimations } from "./SortingAlgorithms/SelectionSortVisualizer.js";
import { getInsertionSortAnimations } from "./SortingAlgorithms/InsertionSortVisualizer.js";
import { getShellSortAnimations } from "./SortingAlgorithms/ShellSortVisualizer.js";
import { getGnomeSortAnimations } from "./SortingAlgorithms/GnomeSortVisualizer.js";
import { getCocktailShakerSortAnimations } from "./SortingAlgorithms/CocktailShakerSortVisualizer.js";
import { getBogoSortAnimations } from "./SortingAlgorithms/BogoSortVisualizer.js";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";
import "./css/SortingVisualizer.css";

// This is the main color of the array bars.
const PRIMARY_COLOR = "black";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";
const barMinHeight = 5;
const barMaxHeight = 600;

const SortingVisualizer = () => {
    const [Data, setData] = useState([]);
    const [animationSpeed, setAnimationSpeed] = useState(10);
    const [arrayBars, setArrayBars] = useState(100);
    const [arrayBarsWidth, setArrayBarsWidth] = useState(4);
    const [inAnimation, setInAnimation] = useState(false);

    const handleBarsChange = (event, newValue) => {
        setArrayBars(newValue);
    };

    const handleAnimationSpeedChange = (event, newValue) => {
        setAnimationSpeed(newValue);
    };

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const resetArray = () => {
        const array = [];
        for (let i = 0; i < arrayBars; i++) {
            array.push([randomIntFromInterval(barMinHeight, barMaxHeight), PRIMARY_COLOR]);
        }
        setData(array);
    };

    const resetBarsWidth = () => {
        const ContainerWidth = document.getElementById("array-container").parentNode.offsetWidth;
        const arrayBarWidth = ((ContainerWidth - arrayBars) * 0.57) / arrayBars;
        setArrayBarsWidth(arrayBarWidth);
    };

    
    useEffect(() => {
        resetArray();
        resetBarsWidth();
        // eslint-disable-next-line
    }, [arrayBars]);


    const mergeSort = () => {
        const computedArray = Data.map((bar) => bar[0]);
        const animations = getMergeSortAnimations(computedArray);

        for (let i = 0; i < animations.length; i++) {
            
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    if (i === 0) setInAnimation(true);
                    if (i === animations.length - 1)setInAnimation(false);
                    setData((prev) => {
                        return prev.map((bar, index) => {
                            if (index === barOneIdx || index === barTwoIdx) {
                                bar[1] = color;
                            }
                            return bar;
                        })
                    });
                }, i * animationSpeed);
            } else {
                setTimeout(() => {
                    if (i === 0) setInAnimation(true);
                    if (i === animations.length - 1)setInAnimation(false);
                    const [barOneIdx, newHeight] = animations[i];
                    setData((prev) => {
                        return prev.map((bar, index) => {
                            if (index === barOneIdx) {
                                bar[0] = newHeight;
                            }
                            return bar;
                        })
                    });
                }, i * animationSpeed);
            }
        }
    };

    const quickSort = () => {
        const computedArray = Data.map((bar) => bar[0]);
        const animations = getQuickSortAnimations(computedArray);
        for (let i = 0; i < animations.length; i++) {

            const isColorChange =
                animations[i][2] === "color-change-start" || animations[i][2] === "color-change-revert";
            if (isColorChange) {
                const barOneIdx = animations[i][0];
                const barTwoIdx = animations[i][1];
                const color = animations[i][2] === "color-change-start" ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    if (i === 0) setInAnimation(true);
                    if (i === animations.length - 1)setInAnimation(false);
                    setData((prev) => {
                        return prev.map((bar, index) => {
                            if (index === barOneIdx || index === barTwoIdx) {
                                bar[1] = color;
                            }
                            return bar;
                        })
                    });
                }, i * animationSpeed);
            } else {
                setTimeout(() => {
                    if (i === 0) setInAnimation(true);
                    if (i === animations.length - 1)setInAnimation(false);
                    const barOneIdx = animations[i][0];
                    const newHeight = animations[i][1];
                    setData((prev) => {
                        return prev.map((bar, index) => {
                            if (index === barOneIdx) {
                                bar[0] = newHeight;
                            }
                            return bar;
                        })
                    });
                }, i * animationSpeed);
            }
        }
    };

    const heapSort = () => {
        const computedArray = Data.map((bar) => bar[0]);
        const animations = getHeapSortAnimations(computedArray);
        for (let i = 0; i < animations.length; i++) {

            const isColorChange =
                animations[i][2] === "color-change-start" || animations[i][2] === "color-change-revert";
            if (isColorChange) {
                const barOneIdx = animations[i][0];
                const barTwoIdx = animations[i][1];
                const color = animations[i][2] === "color-change-start" ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    if (i === 0) setInAnimation(true);
                    if (i === animations.length - 1)setInAnimation(false);
                    setData((prev) => {
                        return prev.map((bar, index) => {
                            if (index === barOneIdx || index === barTwoIdx) {
                                bar[1] = color;
                            }
                            return bar;
                        })
                    });
                }, i * animationSpeed);
            } else {
                setTimeout(() => {
                    if (i === 0) setInAnimation(true);
                    if (i === animations.length - 1)setInAnimation(false);
                    const barOneIdx = animations[i][0];
                    const newHeight = animations[i][1];
                    setData((prev) => {
                        return prev.map((bar, index) => {
                            if (index === barOneIdx) {
                                bar[0] = newHeight;
                            }
                            return bar;
                        })
                    });
                }, i * animationSpeed);
            }
        }
    };

    const bubbleSort = () => {
        const computedArray = Data.map((bar) => bar[0]);
        const animations = getBubbleSortAnimations(computedArray);
        for (let i = 0; i < animations.length; i++) {

            const isColorChange =
                animations[i][2] === "color-change-start" || animations[i][2] === "color-change-revert";
            if (isColorChange) {
                const barOneIdx = animations[i][0];
                const barTwoIdx = animations[i][1];
                const color = animations[i][2] === "color-change-start" ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    if (i === 0) setInAnimation(true);
                    if (i === animations.length - 1)setInAnimation(false);
                    setData((prev) => {
                        return prev.map((bar, index) => {
                            if (index === barOneIdx || index === barTwoIdx) {
                                bar[1] = color;
                            }
                            return bar;
                        })
                    });
                }, i * animationSpeed);
            } else {
                setTimeout(() => {
                    if (i === 0) setInAnimation(true);
                    if (i === animations.length - 1)setInAnimation(false);
                    const barOneIdx = animations[i][0];
                    const newHeight = animations[i][1];
                    setData((prev) => {
                        return prev.map((bar, index) => {
                            if (index === barOneIdx) {
                                bar[0] = newHeight;
                            }
                            return bar;
                        })
                    });
                }, i * animationSpeed);
            }
        }
    };

    const selectionSort = () => {
        const computedArray = Data.map((bar) => bar[0]);
        const animations = getSelectionSortAnimations(computedArray);
        for (let i = 0; i < animations.length; i++) {

            const isColorChange =
                animations[i][2] === "color-change-start" || animations[i][2] === "color-change-revert";
            if (isColorChange) {
                const barOneIdx = animations[i][0];
                const barTwoIdx = animations[i][1];
                const color = animations[i][2] === "color-change-start" ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    if (i === 0) setInAnimation(true);
                    if (i === animations.length - 1)setInAnimation(false);
                    setData((prev) => {
                        return prev.map((bar, index) => {
                            if (index === barOneIdx || index === barTwoIdx) {
                                bar[1] = color;
                            }
                            return bar;
                        })
                    });
                }, i * animationSpeed);
            } else {
                setTimeout(() => {
                    if (i === 0) setInAnimation(true);
                    if (i === animations.length - 1)setInAnimation(false);
                    const barOneIdx = animations[i][0];
                    const newHeight = animations[i][1];
                    setData((prev) => {
                        return prev.map((bar, index) => {
                            if (index === barOneIdx) {
                                bar[0] = newHeight;
                            }
                            return bar;
                        })
                    });
                }, i * animationSpeed);
            }
        }
    };

    const insertionSort = () => {
        const computedArray = Data.map((bar) => bar[0]);
        const animations = getInsertionSortAnimations(computedArray);
        for (let i = 0; i < animations.length; i++) {

            const isColorChange =
                animations[i][2] === "color-change-start" || animations[i][2] === "color-change-revert";
            if (isColorChange) {
                const barOneIdx = animations[i][0];
                const barTwoIdx = animations[i][1];
                const color = animations[i][2] === "color-change-start" ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    if (i === 0) setInAnimation(true);
                    if (i === animations.length - 1)setInAnimation(false);
                    setData((prev) => {
                        return prev.map((bar, index) => {
                            if (index === barOneIdx || index === barTwoIdx) {
                                bar[1] = color;
                            }
                            return bar;
                        })
                    });
                }, i * animationSpeed);
            } else {
                setTimeout(() => {
                    if (i === 0) setInAnimation(true);
                    if (i === animations.length - 1)setInAnimation(false);
                    const barOneIdx = animations[i][0];
                    const newHeight = animations[i][1];
                    setData((prev) => {
                        return prev.map((bar, index) => {
                            if (index === barOneIdx) {
                                bar[0] = newHeight;
                            }
                            return bar;
                        })
                    });
                }, i * animationSpeed);
            }
        }
    };

    const shellSort = () => {
        const computedArray = Data.map((bar) => bar[0]);
        const animations = getShellSortAnimations(computedArray);
        for (let i = 0; i < animations.length; i++) {

            const isColorChange =
                animations[i][2] === "color-change-start" || animations[i][2] === "color-change-revert";
            if (isColorChange) {
                const barOneIdx = animations[i][0];
                const barTwoIdx = animations[i][1];
                const color = animations[i][2] === "color-change-start" ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    if (i === 0) setInAnimation(true);
                    if (i === animations.length - 1)setInAnimation(false);
                    setData((prev) => {
                        return prev.map((bar, index) => {
                            if (index === barOneIdx || index === barTwoIdx) {
                                bar[1] = color;
                            }
                            return bar;
                        })
                    });
                }, i * animationSpeed);
            } else {
                setTimeout(() => {
                    if (i === 0) setInAnimation(true);
                    if (i === animations.length - 1)setInAnimation(false);
                    const barOneIdx = animations[i][0];
                    const newHeight = animations[i][1];
                    setData((prev) => {
                        return prev.map((bar, index) => {
                            if (index === barOneIdx) {
                                bar[0] = newHeight;
                            }
                            return bar;
                        })
                    });
                }, i * animationSpeed);
            }
        }
    };

    const bogoSort = () => {
        const computedArray = Data.map((bar) => bar[0]);
        const animations = getBogoSortAnimations(computedArray);
        for (let i = 0; i < animations.length; i++) {

            const isColorChange =
                animations[i][2] === "color-change-start" || animations[i][2] === "color-change-revert";
            if (isColorChange) {
                const barOneIdx = animations[i][0];
                const barTwoIdx = animations[i][1];
                const color = animations[i][2] === "color-change-start" ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    if (i === 0) setInAnimation(true);
                    if (i === animations.length - 1)setInAnimation(false);
                    setData((prev) => {
                        return prev.map((bar, index) => {
                            if (index === barOneIdx || index === barTwoIdx) {
                                bar[1] = color;
                            }
                            return bar;
                        })
                    });
                }, i * animationSpeed);
            } else {
                setTimeout(() => {
                    if (i === 0) {
                        alert("Bogo sort is a random sort which probably not gonna to finish ... ");
                        setInAnimation(true);
                    }
                    if (i === animations.length - 1) {
                        setInAnimation(false);
                    }
                    const barOneIdx = animations[i][0];
                    const newHeight = animations[i][1];
                    setData((prev) => {
                        return prev.map((bar, index) => {
                            if (index === barOneIdx) {
                                bar[0] = newHeight;
                            }
                            return bar;
                        })
                    });
                }, i * animationSpeed);
            }
        }
    };

    const cocktailShakerSort = () => {
        const computedArray = Data.map((bar) => bar[0]);
        const animations = getCocktailShakerSortAnimations(computedArray);
        for (let i = 0; i < animations.length; i++) {

            const isColorChange =
                animations[i][2] === "color-change-start" || animations[i][2] === "color-change-revert";
            if (isColorChange) {
                const barOneIdx = animations[i][0];
                const barTwoIdx = animations[i][1];
                const color = animations[i][2] === "color-change-start" ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    if (i === 0) setInAnimation(true);
                    if (i === animations.length - 1)setInAnimation(false);
                    setData((prev) => {
                        return prev.map((bar, index) => {
                            if (index === barOneIdx || index === barTwoIdx) {
                                bar[1] = color;
                            }
                            return bar;
                        })
                    });
                }, i * animationSpeed);
            } else {
                setTimeout(() => {
                    if (i === 0) setInAnimation(true);
                    if (i === animations.length - 1)setInAnimation(false);
                    const barOneIdx = animations[i][0];
                    const newHeight = animations[i][1];
                    setData((prev) => {
                        return prev.map((bar, index) => {
                            if (index === barOneIdx) {
                                bar[0] = newHeight;
                            }
                            return bar;
                        })
                    });
                }, i * animationSpeed);
            }
        }
    };


    const gnomeSort = () => {
        const computedArray = Data.map((bar) => bar[0]);
        const animations = getGnomeSortAnimations(computedArray);
        for (let i = 0; i < animations.length; i++) {

            const isColorChange =
                animations[i][2] === "color-change-start" || animations[i][2] === "color-change-revert";
            if (isColorChange) {
                const barOneIdx = animations[i][0];
                const barTwoIdx = animations[i][1];
                const color = animations[i][2] === "color-change-start" ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    if (i === 0) setInAnimation(true);
                    if (i === animations.length - 1)setInAnimation(false);
                    setData((prev) => {
                        return prev.map((bar, index) => {
                            if (index === barOneIdx || index === barTwoIdx) {
                                bar[1] = color;
                            }
                            return bar;
                        })
                    });
                }, i * animationSpeed);
            } else {
                setTimeout(() => {
                    if (i === 0) setInAnimation(true);
                    if (i === animations.length - 1)setInAnimation(false);
                    const barOneIdx = animations[i][0];
                    const newHeight = animations[i][1];
                    setData((prev) => {
                        return prev.map((bar, index) => {
                            if (index === barOneIdx) {
                                bar[0] = newHeight;
                            }
                            return bar;
                        })
                    });
                }, i * animationSpeed);
            }
        }
    };

    const handleArrayHeight = (value) => {
        let windowHeight = window.innerHeight;
        let ratio = (value - barMinHeight) / (barMaxHeight - barMinHeight)
        return windowHeight * ratio * 0.95;
    }

    return (
        <Container maxWidth="lg" style={{ height: "80vh" }} className="sort-Container">
            <div className="wrapper">
                <div className="control">
                    <div className="upperControl">
                        <Typography gutterBottom> Bars </Typography>
                        <Slider
                            value={arrayBars}
                            onChange={handleBarsChange}
                            aria-labelledby="discrete-slider"
                            min={10}
                            max={170}
                            marks
                            valueLabelDisplay="auto"
                            track="inverted"
                            disabled={inAnimation}
                        />
                        <Typography gutterBottom> Speed </Typography>
                        <Slider
                            value={animationSpeed}
                            onChange={handleAnimationSpeedChange}
                            aria-labelledby="discrete-slider"
                            min={0.1}
                            max={100}
                            marks
                            valueLabelDisplay="auto"
                            // track="inverted"
                            scale={(x) => 100 - x + 0.1}
                            disabled={inAnimation}
                        />
                    </div>
                    <ButtonGroup color="primary" aria-label="outlined primary button group" orientation="vertical">
                        <Button disabled={inAnimation} color="secondary" variant="contained" onClick={resetArray}>
                            Generate New Array
                        </Button>
                        <Button onClick={mergeSort} disabled={inAnimation}>Merge Sort</Button>
                        <Button onClick={quickSort} disabled={inAnimation}>Quick Sort</Button>
                        <Button onClick={heapSort} disabled={inAnimation}>Heap Sort</Button>
                        <Button onClick={bubbleSort} disabled={inAnimation}>Bubble Sort</Button>
                        <Button onClick={selectionSort} disabled={inAnimation}>Selection Sort</Button>
                        <Button onClick={insertionSort} disabled={inAnimation}>Insertion Sort</Button>
                        <Button onClick={shellSort} disabled={inAnimation}>Shell Sort</Button>
                        <Button onClick={bogoSort} disabled={inAnimation}>Bogo Sort</Button>
                        <Button onClick={cocktailShakerSort} disabled={inAnimation}>Cocktail Shaker Sort</Button>
                        <Button onClick={gnomeSort} disabled={inAnimation}>Gnome sort</Button>
                    </ButtonGroup>
                </div>
                <div id="array-container" className="array-container">
                    {Data.map((bar, idx) =>  {
                        let height = bar[0];
                        let color = bar[1];
                        return <div
                            className="array-bar"
                            key={idx}
                            style={{
                                backgroundColor: color,
                                height: handleArrayHeight(height),
                                width: `${arrayBarsWidth}px`,
                            }}></div>
                        }
                    )}
                </div>
            </div>
        </Container>
    );
};

export default SortingVisualizer;
