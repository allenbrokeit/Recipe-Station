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
const leftPane = el.lookup('LeftPane')
if (leftPane) {
  console.log("LeftPane state:", !!leftPane.state, leftPane.state.targetYield)
  const ingredientList = leftPane.lookup('IngredientList')
  if (ingredientList) {
    console.log("IngredientList state:", !!ingredientList.state, Array.isArray(ingredientList.state))
    const firstItem = ingredientList.lookup('SmartIngredientItem')
    if (firstItem) {
      console.log("FirstItem state:", firstItem.state)
      console.log("FirstItem props:", firstItem.props)
      console.log("Text node text:", firstItem.lookup('Text').text)
    }
  }
}
