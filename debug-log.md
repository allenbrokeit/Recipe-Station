# DOMQL_V3_DEBUG_LOG

## METADATA
- **Framework:** Symbols / DOMQL v3
- **Component:** `RecipeControls` (Decrement, Increment, US, Metric buttons) & `SmartIngredientItem`
- **Issue:** Buttons do not visually update the ingredient list after being extracted into a separate component.

## SYSTEM_STATE_ARCHITECTURE
- **Root State:** `symbols/state.js` -> `{ recipe: { ... }, targetYield: 4, activeUnitSystem: 'us', ... }`
- **`main.js` (Page):** Inherits Root State implicitly.
- **`RecipeControls`:** Extends into `main.js`. Its `s` parameter in event handlers is the Root State (does not have `s.root`).
- **`SmartIngredientItem`:** Child of `IngredientList` mapped via `childrenAs: 'state'`. Its `s` parameter is the individual ingredient object. It accesses global state via `s.root` (injected by DOMQL).

## ATTEMPTED_SOLUTIONS_AND_FAILURES

### Attempt 1: `s.root.update()` in `RecipeControls`
- **Action:** Extracted `YieldAdjuster` and used `onClick: (e, el, s) => s.root.update({ targetYield: ... })`.
- **Result:** JS Error: `Cannot read properties of undefined (reading 'update')`.
- **Learning:** `RecipeControls` is mounted directly on the page; its `s` IS the Root State. `s.root` is undefined.

### Attempt 2: `s.update()` in `RecipeControls` + Optional Chaining in `SmartIngredientItem`
- **Action:** Changed to `s.update(...)`. Updated `SmartIngredientItem` text to `s.root?.targetYield || 4`.
- **Result:** The numbers inside `RecipeControls` updated, but `SmartIngredientItem` did not react to state changes.
- **Learning:** Optional chaining (`?.`) or logical OR (`||`) inside string template functions bypasses DOMQL's state Proxy tracking. DOMQL fails to register the dependency, preventing reactive re-renders.

### Attempt 3: Explicit State Access Guard
- **Action:** Replaced optional chaining with `if (!s.root || !s.root.recipe) return ''` and direct access `s.root.targetYield`.
- **Result:** Still no reactivity in the ingredient list.
- **Learning:** Even with direct access, the Proxy chain linking the Root State update to the `childrenAs: 'state'` nested child seems broken.

### Attempt 4: `el.getRootState()` everywhere
- **Action:** Replaced `s.root` and `s` with `el.getRootState()` globally in both `RecipeControls` (for updates) and `SmartIngredientItem` (for reads).
- **Result:** SSR crashes fixed, but buttons STILL do not trigger reactivity in the list.
- **Learning:** `el.getRootState()` might retrieve the raw state object rather than the Proxy, or updates to it do not trigger the necessary deep dependency checks for elements rendered via `childrenAs: 'state'`.

## AI_HYPOTHESES_FOR_RESUMPTION

1. **Proxy Context Boundary:**
   DOMQL tracks state dependencies locally. When `s.update({ targetYield: ... })` is called on the Root State, DOMQL checks components directly dependent on the Root State. Because `SmartIngredientItem` is rendered via `childrenAs: 'state'` from `recipe.ingredients` (an array), DOMQL might assume the children only need to re-render if their *specific local state* (the array item) changes. It ignores Root primitive updates for array children to optimize performance.

2. **Force Re-render (`el.update`) vs State Re-render (`s.update`):**
   If `s.update()` fails to trigger deep nested children mapped via arrays, `el.update()` might be required.
   - Hypothesis: Calling `el.getRoot().update()` inside the button click might force the entire component tree to re-evaluate.

3. **`childProps` State Passing:**
   Instead of having `SmartIngredientItem` reach out to `s.root` or `el.getRootState()`, explicitly pass the required global state downwards through `childProps` on the parent list.
   ```javascript
   IngredientList: {
     children: (el, s) => s.recipe.ingredients,
     childrenAs: 'state',
     childExtends: 'SmartIngredientItem',
     childProps: {
       targetYield: (el, s) => s.parent.targetYield,
       baseYield: (el, s) => s.parent.recipe.baseYield,
       activeUnitSystem: (el, s) => s.parent.activeUnitSystem
     }
   }
   ```
   Then in `SmartIngredientItem`, read from `el.props` instead of `s.root`. This forces DOMQL to evaluate the parent's Proxy and pipe the values down as props, which natively trigger re-renders when changed.

## NEXT_STEPS_FOR_AI
1. Read `symbols/components/index.js` and `symbols/pages/main.js`.
2. Implement Hypothesis 3 (`childProps` injection) or Hypothesis 2 (`el.getRoot().update()`).
3. Revert `el.getRootState()` inside `SmartIngredientItem` back to `s.root` to restore native Proxy traversal if `childProps` is not used.
4. Run `npm run build` after changes and verify the output using the `start` server.