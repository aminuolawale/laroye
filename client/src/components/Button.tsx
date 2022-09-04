import React from 'react'
import { Link } from 'react-router-dom';

type Props = {
    text: string;
    size: "xsm" | "sm" | "md" | "lg";
    link: string;
}

const Button = ({ text, size, link = "/" }: Props) => {
    return (
        <Link className={`button button--${size}`} to="link">
            {text}
        </Link>

    )
}

export default Button