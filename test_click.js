import { create } from 'smbls'
import state from './symbols/state.js'
import { main } from './symbols/pages/main.js'
import * as components from './symbols/components/index.js'
import * as functions from './symbols/functions/index.js'
import designSystem from './symbols/designSystem/index.js'

const App = {
  extends: 'main'
}

const el = create(App, { designSystem, components, state, functions })
const incBtn = el.lookup('Increment')
console.log("Before click, targetYield in Root:", el.state.targetYield)
incBtn.node.click()
console.log("After click, targetYield in Root:", el.state.targetYield)
