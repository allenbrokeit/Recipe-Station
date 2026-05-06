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
const firstItem = el.lookup('SmartIngredientItem')
const firstItemText = firstItem.lookup('Text')

console.log("Before click:")
console.log("  targetYield:", el.state.targetYield)
console.log("  firstItemText:", firstItemText.node.textContent)

if (incBtn) {
  // Trigger DOM event
  const event = new dom.window.MouseEvent('click')
  incBtn.node.dispatchEvent(event)
  
  console.log("\nAfter click:")
  console.log("  targetYield:", el.state.targetYield)
  console.log("  firstItemText:", firstItemText.node.textContent)
}
