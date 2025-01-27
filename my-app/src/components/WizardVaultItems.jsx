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
        <div className="mt-[15px]">
            {stateDisplayValue(state)}
            {apiKey && (
                <>
                    <div className="mt-3 text-center">
                        <button className="" onClick={() => fetchFn()}>↺</button>
                    </div>
                </>
            )}
            {state.data && (
                <div className="text-left">
                    <span className='cursor-pointer' onClick={showDataErrorMsg}>🤔</span>
                </div>
            )}

        </div>
    )
}

function ObjectiveList(props) {
    const { objectives } = props

    const rows = objectives && objectives.map((objective) => (
        <tr>
            <td>{objective.track}</td>
            <td>{objective.acclaim}</td>
            <td>{objective.title}</td>
        </tr>
    ))

    return (
        <>
            <div className="items-center">
                {objectives && objectives.length > 0 && (
                    <table className="table-auto text-left w-full">
                        <thead>
                            <tr>
                                <th>Track</th>
                                <th>Acclaim</th>
                                <th>Objective</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                )}   
            </div>        
        </>
    )
}

