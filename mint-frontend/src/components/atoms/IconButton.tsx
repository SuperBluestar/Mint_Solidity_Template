import { FC } from "react";

interface IButtonInterface {
    className?: string,
    Icon?: FC,
    text?: string | FC,
    onClick?: () => void,
    disabled?: boolean,
}
export const IconButton: FC<IButtonInterface> = ({
    className,
    Icon,
    text,
    onClick,
    disabled
}) => {
    return (
        <div 
            className={`flex justify-between items-center border rounded px-6 py-3 m-2 ${disabled ? "bg-pink-900 cursor-not-allowed" : "cursor-pointer bg-pink-500 hover:bg-pink-300"} transition-all text-white hover:text-yellow-300 font-semibold ${className}`}
            onClick={disabled ? undefined : onClick}
        >
            { Icon ? <Icon /> : "" }
            <span>{ text }</span>
        </div>
    )
}