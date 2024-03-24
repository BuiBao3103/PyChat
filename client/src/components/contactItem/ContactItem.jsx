import React from 'react'
import PropTypes from 'prop-types'

export const ContactItem = ({ Icon, title, value }) => {
	return (
		<div className='w-full flex justify-between items-center rounded-xl bg-primary-200 px-3 py-2'>
			<div className="w-fit flex items-center gap-3">
				<div className="w-[40px] h-[40px] flex justify-center items-center rounded-full bg-primary">
					{Icon && <Icon size={20} className="text-white" />}
				</div>
				<span className=''>{title}</span>
			</div>
			<span className='text-base font-bold'>{value}</span>
		</div>
	)
}

ContactItem.propTypes = {
	Icon: PropTypes.element.isRequired,
	title: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired
}