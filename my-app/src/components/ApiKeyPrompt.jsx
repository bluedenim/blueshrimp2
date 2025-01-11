import { useState } from 'react'

import { getAPIKeyDocUrl } from "../api"


export function ApiKeyPrompt(props) {
    const { setApiKey } = props
    const [ reveal, setReveal ] = useState(false)
    const submitApiKey = () => {
        const value = document.getElementById("api-key-value").value
        setApiKey(value)
    }
    const showApiHelp = () => {
        window.open(getAPIKeyDocUrl(), "_blank")
    }
    const inputElement = reveal ? (
        <input id="api-key-value" className="font-mono grow bg-slate-100 dark:bg-inherit" type="text" placeholder="API Key from ArenaNet here" />
    ) : (
        <input id="api-key-value" className="font-mono grow bg-slate-100 dark:bg-inherit" type="password" placeholder="API Key from ArenaNet here" />
    )

    return (
        <div className="flex gap-3 align-center items-center">
            <div className="text-right font-bold grow-0">
                API Key <span className="border-2 border-zinc-400 rounded-full cursor-pointer" onClick={showApiHelp}>&nbsp;?&nbsp;</span>
            </div>
            {inputElement}
            <button className="grow-0 text-center" onClick={() => {setReveal(reveal ? false : true)}}>🜳</button>
            <button className="grow-0 text-center" onClick={submitApiKey}>⏎</button>
        </div>
    )
}
