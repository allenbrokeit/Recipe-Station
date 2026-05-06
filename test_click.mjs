import { create } from 'smbls'
import state from './symbols/state.js'
import { main } from './symbols/pages/main.js'
import * as components from './symbols/components/index.js'
import * as functions from './symbols/functions/index.js'
import designSystem from './symbols/designSystem/index.js'

// Simple mock for document
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
global.window = dom.window
global.document = dom.window.document

const App = { extends: 'main' }

const el = create(App, { designSystem, components, state, functions })
const incBtn = el.lookup('Increment')

console.log("Before click, targetYield in Root:", el.state.targetYield)
console.log("incBtn exists?", !!incBtn)

if (incBtn) {
  // Manually trigger the onClick logic from the component definition
  incBtn.on.click()
  console.log("After click, targetYield in Root:", el.state.targetYield)
  console.log("TargetYield in child:", el.lookup('LeftPane').state.targetYield)
}
