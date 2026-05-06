export const main = {
  extends: 'Page',
  flow: 'y', padding: 'C', gap: 'C',
  fontFamily: 'Default', color: 'title',
  maxWidth: '1200px', margin: '0 auto',

  HeaderInfo: {
    flow: 'y', gap: 'A',
    H1: { text: (el, s) => s.recipes[s.activeRecipeIndex].title, fontSize: 'E', fontWeight: 'bold' },
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
        children: (el, s) => s.recipes[s.activeRecipeIndex].ingredients,
        childrenAs: 'state',
        childExtends: 'SmartIngredientItem'
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
        children: (el, s) => s.recipes.map((r, i) => ({
          tag: 'option',
          props: { value: i, selected: i === s.activeRecipeIndex },
          text: r.title
        })),
        on: {
          input: (e, el, s) => {
            const newIndex = parseInt(el.node.value)
            s.update({ 
              activeRecipeIndex: newIndex,
              targetYield: s.recipes[newIndex].baseYield || 4,
              activeStepIndex: 0
            })
            el.getRoot().update()
          }
        }
      },
      H3: { tag: 'h3', text: 'Instructions', fontSize: 'C', borderBottom: '2px solid', borderBottomColor: 'primary', paddingBottom: 'Z' },
      InstructionStepper: {
        children: (el, s) => s.recipes[s.activeRecipeIndex]?.instructions || [],
      }
    }
  }
}
