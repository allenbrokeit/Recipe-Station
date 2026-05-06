import { create } from 'smbls'
import state from './symbols/state.js'
import { main } from './symbols/pages/main.js'
import * as components from './symbols/components/index.js'
import * as functions from './symbols/functions/index.js'
import designSystem from './symbols/designSystem/index.js'

import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
global.window = dom.window
global.document = dom.window.document

const App = { extends: 'main' }
const el = create(App, { designSystem, components, state, functions })

const incBtn = el.lookup('Increment')
console.log("Initial root state targetYield:", el.state.targetYield)
console.log("Initial incBtn state targetYield:", incBtn.state.targetYield)

if (incBtn) {
  // Let's see what `s` is in the click handler
  console.log("Is incBtn.state === el.state?", incBtn.state === el.state)
  
  // Execute the onClick
  incBtn.on.click({}, incBtn, incBtn.state)
  
  console.log("After click, root state targetYield:", el.state.targetYield)
  console.log("After click, incBtn state targetYield:", incBtn.state.targetYield)
}
