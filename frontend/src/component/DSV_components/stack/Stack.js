import React, { useState, useEffect } from 'react'
import Stackk from './DataStructure'
import StackMenu from './StackMenu'
import { Icon } from '@iconify/react'
import usePopup from '../../../hooks/usePopup'
import questionMarkCircleOutline from '@iconify/icons-eva/question-mark-circle-outline'
import '../../css/DS_Visualizer/ARRAYStyle.scss'
import StackPopup from './StackPopup'
function Stack(props) {
	const [stack, setStack] = useState(null)
	const [stackHtml, setStackHtml] = useState(null)
	const [popnum, setpopnum] = useState()
	const [popup, togglePopup] = usePopup()

	//Initializing Tree
	useEffect(() => {
		let tempStack = new Stackk()
		setStack(tempStack)
		return () => {
			setStack(null)
			setStackHtml(null)
		}
	}, [])



	//Push Function
	const push = val => {
		
		val = parseInt(val)
		if (!val) return
		let tempStack = stack
		tempStack.push(val)
		setStack(tempStack)
		setStackHtml(tempStack.html)
		return val
	}
	//Pop element
	const pop = () => {
		let tempStack = stack
		setpopnum(tempStack.pop())
		setStack(tempStack)
		setStackHtml(tempStack.html)
	}

	//Generate stack with random values
	const random = value => {
		value = parseInt(value)
		let tempStack = new Stackk(value)
		setStack(tempStack)
		setStackHtml(tempStack.html)
	}


    return (
		<div>
			<header>
				<h1 className="heading">
					Stack
					<button className="i" onClick={togglePopup}>
					<Icon
							icon={questionMarkCircleOutline}
							width="25px"
							height="15px"
						/>
					</button>
				</h1>
				<button
					onClick={() => props.selector('menu')}
					className="main-menu-button"
				>
					Change Data Structure
				</button>
			</header>
			<StackMenu
				insert={push}
				remove={pop}
				random={random}
			/>
			<div className="array">
				<ul>{stackHtml}</ul>
			</div>
			<div className="traversal">
				{stack && stack.stack.length ? (
					<ul>
						{stack.pre > stack.top? ('Pop:'):('Push:')}
						{stack.pre > stack.top? (popnum)
						:
						(<li>{stack.stack[stack.stack.length-1]}</li>)}

					</ul>
				) : (
					<p>Stack is Empty</p>
				)}
			</div>
			<div className="traversal ar">
				{stack && stack.stack.length ? (
					<ul>
						{'Top:'}
						{stack.stack[stack.stack.length-1]}
					</ul>
				) : (
					<p>Stack is Empty</p>
				)}
			</div>
			{popup ? <StackPopup toggle={togglePopup} /> : null}
		</div>
	)
}

export default Stack