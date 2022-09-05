import React, { useReducer, useEffect } from "react";
import "./css/DS_Visualizer/DataStructureVisualizer.scss";
import "./css/DS_Visualizer/BSTStyle.scss";
import "./css/DS_Visualizer/popup.scss";
import "./css/DS_Visualizer/mainMenuStyle.scss";
import Menu from "./DSV_components/Menu";
import BSTree from "./DSV_components/bst/BSTree";
import MinH from "./DSV_components/minHeap/MinH";
import MaxH from "./DSV_components/maxHeap/MaxH";
import TrieMain from "./DSV_components/trie/TrieMain";
import AVLTree from "./DSV_components/avl/AVLTree";
import RedBTree from "./DSV_components/redBlack/RedBTree";
import usePopup from "../hooks/usePopup";
import MainPopup from "./DSV_components/MainPopup";
import Stack from "./DSV_components/stack/Stack";
import Queue from "./DSV_components/queue/Queue";
const initialState = {
    menu: true,
    stack: false,
    queue: false,
    bst: false,
    trie: false,
    minheap: false,
    maxheap: false,
    avl: false,
    redb: false,
};

const reducer = (state, action) => {
    switch (action) {
        case "menu":
            return { ...initialState, menu: true };
        case "bst":
            return { ...initialState, bst: true, menu: false, redb: false };
        case "trie":
            return { ...initialState, trie: true, menu: false };
        case "minheap":
            return { ...initialState, minheap: true, menu: false };
        case "maxheap":
            return { ...initialState, maxheap: true, menu: false };
        case "avl":
            return { ...initialState, avl: true, menu: false };
        case "redb":
            return { ...initialState, redb: true, menu: false };
        case "stack":
            return { ...initialState, stack: true, menu: false };
        case "queue":
            return { ...initialState, queue: true, menu: false };
        default:
            return state;
    }
};

function DataStructureVisualizer() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [popup, togglePopup] = usePopup();

    useEffect(() => {
        togglePopup();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="DataStructureVisualizer">
            {state.menu && <Menu selector={dispatch} togglePopup={togglePopup} />}
            {state.queue && <Queue selector={dispatch} />}
            {state.stack && <Stack selector={dispatch} />}
            {state.bst && <BSTree selector={dispatch} />}
            {state.trie && <TrieMain selector={dispatch} />}
            {state.minheap && <MinH selector={dispatch} />}
            {state.maxheap && <MaxH selector={dispatch} />}
            {state.avl && <AVLTree selector={dispatch} />}
            {state.redb && <RedBTree selector={dispatch} />}
            {popup ? <MainPopup toggle={togglePopup} /> : null}
        </div>
    );
}

export default DataStructureVisualizer;
