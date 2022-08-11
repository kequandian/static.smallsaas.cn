import React, { useState } from 'react';


export default function index(props) {
    const { CallBack } = props
    const [agreeStatus, setAgreeStatus] = useState(true)

    function onClick() {
        setAgreeStatus(!agreeStatus)
        CallBack(agreeStatus)
    }

    return (
        <div onClick={() => { onClick(agreeStatus) }} style={{ background: '', width: '16px', heigth: '10px' }} >
            {
                agreeStatus ?
                    (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ced4da" class="bi bi-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#09ba08" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                    )
            }
        </div>
    )
}