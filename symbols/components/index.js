export const RecipeControls = {
  flow: 'x', gap: 'B', align: 'center flex-start', wrap: 'wrap',
  YieldAdjuster: {
    flow: 'x', align: 'center', gap: 'A',
    Decrement: {
      extends: 'Button', theme: 'dialog',
      text: '-', round: 'C',
      padding: 'Z A',
      onClick: (e, el, s) => {
        s.root.update({ targetYield: Math.max(1, s.root.targetYield - 1) })
      }
    },
    Value: { text: (el, s) => s.root.targetYield, fontSize: 'B', fontWeight: 'bold' },
    Increment: {
      extends: 'Button', theme: 'dialog',
      text: '+', round: 'C',
      padding: 'Z A',
      onClick: (e, el, s) => {
        s.root.update({ targetYield: s.root.targetYield + 1 })
      }
    }
  },
  UnitToggle: {
    flow: 'x', background: 'gray', round: 'C', padding: 'Y',
    US: {
      extends: 'Button', text: 'US', round: 'C',
      padding: 'Z A', margin: '0',
      background: (el, s) => s.root.activeUnitSystem === 'us' ? 'white' : 'transparent',
      color: (el, s) => s.root.activeUnitSystem === 'us' ? 'title' : 'white',
      boxShadow: (el, s) => s.root.activeUnitSystem === 'us' ? '0 Y Z gray.2' : 'none',
      onClick: (e, el, s) => {
        s.root.update({ activeUnitSystem: 'us' })
      }
    },
    Metric: {
      extends: 'Button', text: 'Metric', round: 'C',
      padding: 'Z A', margin: '0',
      background: (el, s) => s.root.activeUnitSystem === 'metric' ? 'white' : 'transparent',
      color: (el, s) => s.root.activeUnitSystem === 'metric' ? 'title' : 'white',
      boxShadow: (el, s) => s.root.activeUnitSystem === 'metric' ? '0 Y Z gray.2' : 'none',
      onClick: (e, el, s) => {
        s.root.update({ activeUnitSystem: 'metric' })
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
      const root = s.root
      const recipe = root.recipes[root.activeRecipeIndex]
      if (!recipe) return s.name || ''
      return el.call('formatIngredient', s, root.targetYield, recipe.baseYield, root.activeUnitSystem)
    },
    fontSize: 'A',
  }
}

export const InstructionStep = {
  flow: 'y', gap: 'A', padding: 'A', round: 'B',
  transition: 'opacity 0.3s, background 0.3s',
  opacity: (el, s) => {
    const idx = parseInt(String(el.key).replace(/\D/g, ''))
    return idx === s.root.activeStepIndex ? '1' : '0.4'
  },
  background: (el, s) => {
    const idx = parseInt(String(el.key).replace(/\D/g, ''))
    return idx === s.root.activeStepIndex ? 'surface' : 'transparent'
  },
  boxShadow: (el, s) => {
    const idx = parseInt(String(el.key).replace(/\D/g, ''))
    return idx === s.root.activeStepIndex ? '0 A B gray.2' : 'none'
  },
  class: (el, s) => {
    const idx = parseInt(String(el.key).replace(/\D/g, ''))
    return idx === s.root.activeStepIndex ? 'step-active' : ''
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
    text: (el, s) => s.text || s.value, fontSize: 'A', lineHeight: '1.5'
  },
  NextBtn: {
    if: (el, s) => {
      const root = s.root
      const idx = parseInt(String(el.parent?.key).replace(/\D/g, ''))
      return idx === root.activeStepIndex && idx < (root.instructions.length - 1)
    },
    extends: 'Button', theme: 'primary', text: 'Next Step', alignSelf: 'flex-start',
    onClick: (e, el, s) => {
      s.root.update({ activeStepIndex: s.root.activeStepIndex + 1 })
      el.call('scrollToActiveStep', s.root.activeStepIndex)
    }
  },
  DoneBtn: {
    if: (el, s) => {
      const root = s.root
      const idx = parseInt(String(el.parent?.key).replace(/\D/g, ''))
      return idx === root.activeStepIndex && idx === (root.instructions.length - 1)
    },
    extends: 'Button', theme: 'success', text: 'Finish Recipe', alignSelf: 'flex-start',
    onClick: (e, el, s) => {
      s.root.update({ activeStepIndex: -1 })
    }
  }
}

export const InstructionStepper = {
  flow: 'y', gap: 'B',
  children: (el, s) => (s.root.instructions || []).map(text => ({ text })),
  childExtends: 'InstructionStep',
  childrenAs: 'state'
}
