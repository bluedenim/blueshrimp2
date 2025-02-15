import { useState } from 'react'
import './App.css'
import { ApiKeyPrompt } from './components/ApiKeyPrompt'
import { WizardVaultItems } from './components/WizardVaultItems'
import gw2logo from './components/assets/GW2_Logo.jpg'

function App() {
  const [apiKey, setApiKey] = useState(null)

  return (
      <div className="items-center">
        <div className="grid justify-items-center">
          <a href="https://www.guildwars2.com/en/" target="_blank" rel="noopener noreferrer"><img src={gw2logo} alt="GW2 logo" /></a>
        </div>
        <h1 className="">
          Wizard's Vault Daily Objectives
        </h1>
        <div className="text-sm">
          You will need to get an API key from ArenaNet to use the API. See&nbsp;
          <a href="https://wiki.guildwars2.com/wiki/API:API_key" target="_blank" rel="noopener noreferrer">their Wiki on API_key</a>&nbsp;
          for details. The API key must include the <b>account</b> permission.
        </div>
        <ApiKeyPrompt apiKey={apiKey} setApiKey={setApiKey} />
        <WizardVaultItems apiKey={apiKey} />
      </div>
  )
}

export default App
