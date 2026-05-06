export const RecipeControls = {
  flow: 'x', gap: 'B', align: 'center flex-start', wrap: 'wrap',
  YieldAdjuster: {
    flow: 'x', align: 'center', gap: 'A',
    Decrement: {
      extends: 'Button', theme: 'dialog',
      text: '-', round: 'C',
      padding: 'Z A',
      onClick: (e, el, s) => {
        s.update({ targetYield: Math.max(1, s.targetYield - 1) })
        el.getRoot().update()
      }
    },
    Value: { text: (el, s) => s.targetYield, fontSize: 'B', fontWeight: 'bold' },
    Increment: {
      extends: 'Button', theme: 'dialog',
      text: '+', round: 'C',
      padding: 'Z A',
      onClick: (e, el, s) => {
        s.update({ targetYield: s.targetYield + 1 })
        el.getRoot().update()
      }
    }
  },
  UnitToggle: {
    flow: 'x', background: 'gray 0.05', round: 'C', padding: 'Y',
    US: {
      extends: 'Button', text: 'US', round: 'C',
      padding: 'Z A', margin: '0',
      background: (el, s) => s.activeUnitSystem === 'us' ? 'white' : 'transparent',
      color: (el, s) => s.activeUnitSystem === 'us' ? 'title' : 'gray.5',
      boxShadow: (el, s) => s.activeUnitSystem === 'us' ? '0 Y Z gray.2' : 'none',
      onClick: (e, el, s) => {
        s.update({ activeUnitSystem: 'us' })
        el.getRoot().update()
      }
    },
    Metric: {
      extends: 'Button', text: 'Metric', round: 'C',
      padding: 'Z A', margin: '0',
      background: (el, s) => s.activeUnitSystem === 'metric' ? 'white' : 'transparent',
      color: (el, s) => s.activeUnitSystem === 'metric' ? 'title' : 'gray.5',
      boxShadow: (el, s) => s.activeUnitSystem === 'metric' ? '0 Y Z gray.2' : 'none',
      onClick: (e, el, s) => {
        s.update({ activeUnitSystem: 'metric' })
        el.getRoot().update()
      }
    }
  }
}

export const SmartIngredientItem = {
  flow: 'x', align: 'center flex-start', gap: 'A',
  padding: 'Z 0', borderBottom: '1px solid', borderBottomColor: 'gray.2',
  cursor: 'pointer',
  onClick: (e, el, s) => s.update({ isChecked: !s.isChecked }),
  opacity: (el, s) => s.isChecked ? '0.5' : '1',
  textDecoration: (el, s) => s.isChecked ? 'line-through' : 'none',
  CheckMark: {
    boxSize: 'A', round: 'A',
    border: '2px solid', borderColor: (el, s) => s.isChecked ? 'primary' : 'gray.4',
    background: (el, s) => s.isChecked ? 'primary' : 'transparent',
    align: 'center center',
    Icon: {
      if: (el, s) => s.isChecked,
      name: 'check', boxSize: 'Z', color: 'white'
    }
  },
  Text: {
    text: (el, s) => {
      const rootState = el.parent?.parent?.state || s.parent || {}
      const recipe = rootState.recipes ? rootState.recipes[rootState.activeRecipeIndex] : rootState.recipe
      if (!recipe) return s.name || ''
      return el.call('formatIngredient', s, rootState.targetYield, recipe.baseYield, rootState.activeUnitSystem)
    },
    fontSize: 'A',
  }
}

export const InstructionStep = {
  flow: 'y', gap: 'A', padding: 'A', round: 'B',
  transition: 'opacity 0.3s, background 0.3s',
  opacity: (el, s) => {
    const root = el.parent?.state || s.parent
    return parseInt(String(el.key).replace(/\D/g, '')) === root?.activeStepIndex ? '1' : '0.4'
  },
  background: (el, s) => {
    const root = el.parent?.state || s.parent
    return parseInt(String(el.key).replace(/\D/g, '')) === root?.activeStepIndex ? 'surface' : 'transparent'
  },
  boxShadow: (el, s) => {
    const root = el.parent?.state || s.parent
    return parseInt(String(el.key).replace(/\D/g, '')) === root?.activeStepIndex ? '0 A B gray.2' : 'none'
  },
  class: (el, s) => {
    const root = el.parent?.state || s.parent
    return parseInt(String(el.key).replace(/\D/g, '')) === root?.activeStepIndex ? 'step-active' : ''
  },
  
  Header: {
    flow: 'x', gap: 'Z', align: 'center flex-start',
    Number: {
      text: '•', color: 'primary', fontSize: 'C', fontWeight: 'bold', lineHeight: '1'
    },
    Title: { 
      tag: 'h4', 
      text: (el, s) => `Step ${parseInt(String(el.parent?.parent?.key).replace(/\D/g, '')) + 1}`, 
      fontSize: 'A'
    }
  },
  Content: {
    text: (el, s) => s.value, fontSize: 'A', lineHeight: '1.5'
  },
  NextBtn: {
    if: (el, s) => {
      const root = el.parent?.parent?.state || s.parent
      const recipe = root.recipes ? root.recipes[root.activeRecipeIndex] : root.recipe
      if (!recipe) return false
      const idx = parseInt(String(el.parent?.key).replace(/\D/g, ''))
      return idx === root.activeStepIndex && idx < (recipe.instructions.length - 1)
    },
    extends: 'Button', theme: 'primary', text: 'Next Step', alignSelf: 'flex-start',
    onClick: (e, el, s) => {
      const root = el.parent?.parent?.state || s.parent
      root.update({ activeStepIndex: root.activeStepIndex + 1 })
      el.call('scrollToActiveStep', root.activeStepIndex)
    }
  },
  DoneBtn: {
    if: (el, s) => {
      const root = el.parent?.parent?.state || s.parent
      const recipe = root.recipes ? root.recipes[root.activeRecipeIndex] : root.recipe
      if (!recipe) return false
      const idx = parseInt(String(el.parent?.key).replace(/\D/g, ''))
      return idx === root.activeStepIndex && idx === (recipe.instructions.length - 1)
    },
    extends: 'Button', theme: 'success', text: 'Finish Recipe', alignSelf: 'flex-start',
    onClick: (e, el, s) => {
      const root = el.parent?.parent?.state || s.parent
      root.update({ activeStepIndex: -1 })
    }
  }
}

export const InstructionStepper = {
  flow: 'y', gap: 'B',
  children: (el, s) => (el.parent?.state || s).recipe?.instructions || [],
  childrenAs: 'state',
  childExtends: 'InstructionStep'
}
