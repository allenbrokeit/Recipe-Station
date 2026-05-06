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
const firstIngredientText = el.lookup('SmartIngredientItem').lookup('Text')
console.log('Props received:', firstIngredientText.parent.props)
console.log('Parent props baseYield:', firstIngredientText.parent.props.baseYield)
