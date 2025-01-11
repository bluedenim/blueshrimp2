import { useEffect } from 'react'
import { useFetchReducedState, getWizardVaultDailyUrl } from '../api'

export function WizardVaultItems(props) {
    const { apiKey } = props
    const [state, fetchFn] = useFetchReducedState(getWizardVaultDailyUrl(apiKey))

    const showDataErrorMsg = () => {
        alert(
`Yes. These objectives currently DO NOT match the ones in-game. 
This is as best as I can tell the limitation of the API:

    v2/account/wizardsvault/daily
    
¯\\_(ツ)_/¯

See:
https://wiki.guildwars2.com/wiki/API:2/account/wizardsvault/daily
`
        )
    }

    const stateDisplayValue = (state) => {
        if (state.data) {
            return <ObjectiveList objectives={state.data.objectives} />
        } else if (state.isLoading) {
            return (
                <div className="items-center">
                Loading...
                </div>
            )
        } else if (state.error) {
            // Assume error here to be either {text: ..., ...} or something printable
            const content = (state.error.text) ? state.error.text : state.error.toString()
            return (
                <div className="items-center">
                {content}
                </div>
            )
        }
        // inactive
        return <></>
    }

    useEffect(
        () => {
            if (apiKey && apiKey.length > 0) {
                fetchFn()
            }
        },
        [ apiKey ]
    )

    return (
        <>
            {stateDisplayValue(state)}
            {apiKey && (
                <>
                    <div className="mt-3 text-center">
                        <button className="" onClick={() => fetchFn()}>↺</button>
                    </div>
                    <div className="text-left">
                        <span className='cursor-pointer' onClick={showDataErrorMsg}>🤔</span>
                    </div>
                </>
            )}

        </>
    )
}

function ObjectiveList(props) {
    const { objectives } = props

    return (
        <div className="items-center">
            {objectives && objectives.length > 0 && (
                <div className="grid grid-cols-[100px_50px_1fr] gap-10 items-center">
                    <div className="font-bold grow-0">Track</div>
                    <div className="font-bold grow-0">Acclaim</div>
                    <div className="font-bold grow text-left">Objective</div>
                </div>
            )}
            {objectives && objectives.map((objective) => (
                <div className="grid grid-cols-[100px_50px_1fr] gap-10 items-center" key={objective.id}>
                    <div className="grow-0">{objective.track}</div>
                    <div className="grow-0 text-left">{objective.acclaim}</div>
                    <div className="grow text-left">{objective.title}</div>
                </div> 
            ))}     
        </div>
    )
}

