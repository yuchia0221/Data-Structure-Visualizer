import React from 'react'





class Stackk{
	constructor(num = 0) {
		this.top = 0
		this.stack = []
		this.html = null
        this.pre = 0
		if (num) {
			this.generateRandomStack(num)
		}
	}

	//Checks if stack is empty
	isEmpty() {
		return this.top === 0
	}

	//Push a value into the array
	push(value) {
		this.stack[this.top] = value
		this.top++
        this.pre = this.top - 10
		this.html = this.updateHtml()
	}

	//Extracts the top value
	pop() {
		if (this.isEmpty()) return -111111
		let temp = this.stack[this.top-1]
        this.top--
        this.pre = this.top + 10
		this.stack.pop()
		this.html = this.updateHtml()

		return temp
	}
	//updates the whole html
	updateHtml(p = 0) {
		if (!this.top) return null

        return(
            <div>
            {this.stack.map((data,index) => (
                <li key = {index}>
                    <div className="normal">{data}</div>
                </li>
            ))}
            </div>
        )
    }

    //Inserts num random values
	generateRandomStack(num) {
		let upper = 0
		let lower = num * 2 + 10
		let elements = new Set()
		for (let i = 0; i < num; i++) {
			let value =
				Math.floor(Math.random() * (upper - lower + 1)) + lower
			while (elements.has(value)) {
				value =
					Math.floor(Math.random() * (upper - lower + 1)) + lower
			}
			elements.add(value)
			this.push(value)
		}
	}

}


export default Stackk
