import React, { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom';

interface ButtonProps extends PropsWithChildren {
    size: "xsm" | "sm" | "md" | "lg";
    link: string;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <Link className={`button button--${props.size}`} to={props.link}>
            {props.children}
        </Link>

    )
}

export default Button