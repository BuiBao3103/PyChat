import React from 'react'

const Message = () => {
	return (
		<div className={`chat chat-end`}>
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<img src="https://images.unsplash.com/photo-1711124478481-09eb00111938?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
				</div>
			</div>
			<div className="chat-header flex gap-1">
				<h1 className=''>Jack Phat</h1>
				<time className="text-xs flex items-center">12:45</time>
			</div>
			<div className="chat-bubble w-fit rounded-md text-white bg-primary text-right">Hi! What is up?</div>
		</div>
	)
}

export default Message