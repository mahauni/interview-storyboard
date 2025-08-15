import React, { useState } from 'react'
import './assets/style.css'


export interface InputProps {
    type?: 'text' | 'password' | 'number'
    clearable?: boolean
}

export const Input = ({ type = 'text', clearable = false, ...props }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const [internalText, setInternalText] = useState("")

    function getInputType() {
        if (showPassword === true && type === "password") {
            return "text"
        }
        return type
    }

    function getInputPattern() {
        if (type === 'number') {
            return "[0-9]"
        }
        return ""
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setInternalText(value);
    }

    function onClear() {
        setInternalText("")
    }

    return (
        <div
            className={["input-container"].join(' ')}
        >
            <input
                type={getInputType()}
                pattern={getInputPattern()}
                value={internalText}
                onChange={(e) => onChange(e)}
                className={['storybook-input', `storybook-input--${type}`, "input-field"].join(' ')}
                {...props}
            >
            </input>
            <div className='input-actions'>
                {clearable && (
                    <button type="button" onClick={onClear} className="clear-button">
                        X
                    </button>
                )}
                {type === "password" && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="toggle-password"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                )}
            </div>
        </div>
    )
}
