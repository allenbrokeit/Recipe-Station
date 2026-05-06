export const main = {
  extends: 'Page',
  flow: 'y', padding: 'C', gap: 'C',
  fontFamily: 'Default', color: 'title',
  maxWidth: '1200px', margin: '0 auto',

  HeaderInfo: {
    flow: 'y', gap: 'A',
    H1: { 
      text: (el, s) => {
        const recipes = s.root.recipes
        const idx = s.root.activeRecipeIndex
        return recipes[idx] ? recipes[idx].title : ''
      },
      fontSize: 'E', fontWeight: 'bold' 
    },
    Controls: {
      extends: 'RecipeControls'
    }
  },

  TwoPane: {
    flow: 'x', gap: 'D', wrap: 'wrap',
    '@mobileL': { flow: 'y' },
    
    LeftPane: {
      flow: 'y', gap: 'B', flex: '1', minWidth: '300px',
      H3: { tag: 'h3', text: 'Ingredients', fontSize: 'C', borderBottom: '2px solid', borderBottomColor: 'primary', paddingBottom: 'Z' },
      IngredientList: {
        flow: 'y',
        children: (el, s) => s.root.ingredients || [],
        childExtends: 'SmartIngredientItem',
        childrenAs: 'state'
      }
    },

    Divider: {
      width: '1px',
      background: 'gray.2',
      '@mobileL': {
        width: '100%',
        height: '1px'
      }
    },
    
    RightPane: {
      flow: 'y', gap: 'B', flex: '1.5', minWidth: '300px',
      RecipeSelector: {
        tag: 'select',
        padding: 'Z A',
        round: 'Z',
        outline: 'none',
        border: '1px solid',
        borderColor: 'gray.2',
        background: 'white',
        cursor: 'pointer',
        fontSize: 'A',
        fontFamily: 'inherit',
        children: (el, s) => s.root.recipes.map((r, i) => ({
          tag: 'option',
          attr: { value: String(i) },
          text: r.title
        })),
        onRender: (el, s) => {
          el.node.value = String(s.root.activeRecipeIndex)
        },
        onInput: (e, el, s) => {
          const idx = parseInt(el.node.value)
          if (isNaN(idx)) return
          const recipe = s.root.recipes[idx]
          s.root.update({ 
            activeRecipeIndex: idx,
            targetYield: recipe.baseYield || 4,
            activeStepIndex: 0,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions
          })
        }
      },
      H3: { tag: 'h3', text: 'Instructions', fontSize: 'C', borderBottom: '2px solid', borderBottomColor: 'primary', paddingBottom: 'Z' },
      StepperContainer: {
        flow: 'y', gap: 'B',
        children: (el, s) => (s.root.instructions || []).map(text => ({ text })),
        childExtends: 'InstructionStep',
        childrenAs: 'state'
      }
    }
  }
}
