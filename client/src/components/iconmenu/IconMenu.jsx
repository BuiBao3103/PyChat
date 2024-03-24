import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Tooltip } from 'react-tooltip'
const IconMenu = ({ to, Icon, title }) => {
	return (
		<>
			<Link
				data-tooltip-id="my-tooltip"
				data-tooltip-content={title}
				data-tooltip-place="right"
				data-tooltip-offset={20}
				to={to} className={`w-[55px] h-[55px] flex justify-center items-center rounded-lg hover:bg-primary group transition-all`}>
				{Icon && <Icon size={29} className="group-hover:text-white" />}
			</Link>
			<Tooltip id="my-tooltip" style={{ backgroundColor: "#3fbf9e", fontWeight: "500",zIndex: 1000 }} />
		</>

	)
}
IconMenu.propTypes = {
	to: PropTypes.string.isRequired,
	Icon: PropTypes.element,
	title: PropTypes.string.isRequired,
}

export default IconMenu