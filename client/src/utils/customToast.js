import { toast } from "react-toastify";
import { HiOutlineCheckBadge, HiOutlineExclamationTriangle, HiOutlineInformationCircle } from "react-icons/hi2";

const ICONS = [
	{
		success: HiOutlineCheckBadge,
	},
	{
		error: HiOutlineExclamationTriangle,
	},
	{
		info: HiOutlineInformationCircle,
	}
]

export const customToast = ({ type, message }) => {
	toast(message, { icon: ICONS[type] });
};