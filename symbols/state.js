import recipes from './recipes.js'

const firstRecipe = recipes[0]

export default {
  recipes,
  activeRecipeIndex: 0,
  targetYield: firstRecipe.baseYield,
  activeUnitSystem: 'us',
  activeStepIndex: 0,
  ingredients: firstRecipe.ingredients,
  instructions: firstRecipe.instructions
}
