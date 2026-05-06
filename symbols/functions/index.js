export const formatIngredient = function formatIngredient(s, targetYield, baseYield, activeUnitSystem) {
  if (!s) return ''
  if (!s.baseQuantity) return s.name || ''
  let qty = s.baseQuantity * (targetYield / baseYield)
  let unit = s.baseUnit || ''
  
  let normalizedUnit = unit.toLowerCase().trim()
  if (normalizedUnit.endsWith('s') && normalizedUnit !== 'oz') {
    normalizedUnit = normalizedUnit.replace(/s$/, '') // remove trailing s for easier matching
  }
  
  if (activeUnitSystem === 'metric') {
    if (normalizedUnit === 'cup') {
      qty = qty * 236.588; unit = 'ml'
    } else if (normalizedUnit === 'oz' || normalizedUnit === 'ounce') {
      qty = qty * 28.3495; unit = 'g'
    } else if (normalizedUnit === 'tbsp' || normalizedUnit === 'tablespoon') {
      qty = qty * 14.7868; unit = 'ml'
    } else if (normalizedUnit === 'teaspoon' || normalizedUnit === 'tsp') {
      qty = qty * 4.92892; unit = 'ml'
    } else if (normalizedUnit === 'fluid' || normalizedUnit === 'fl oz') {
      qty = qty * 29.5735; unit = 'ml'
    } else if (normalizedUnit === 'quart') {
      qty = qty * 0.946353; unit = 'L'
    } else if (normalizedUnit === 'pound' || normalizedUnit === 'lb') {
      qty = qty * 453.592; unit = 'g'
    }
    
    // Auto-scale up to kg or L if values get too large
    if (unit === 'g' && qty >= 1000) {
      qty = qty / 1000; unit = 'kg'
    } else if (unit === 'ml' && qty >= 1000) {
      qty = qty / 1000; unit = 'L'
    }
  } else if (activeUnitSystem === 'us') {
    if (normalizedUnit === 'ml') {
      qty = qty / 236.588; unit = 'cup'
    } else if (normalizedUnit === 'g') {
      qty = qty / 28.3495; unit = 'oz'
    } else if (normalizedUnit === 'l' || normalizedUnit === 'liter') {
      qty = qty / 0.946353; unit = 'quart'
    } else if (normalizedUnit === 'kg') {
      qty = qty / 0.453592; unit = 'pound'
    }
  }
  
  qty = Math.round(qty * 100) / 100
  
  let formattedQty = qty.toString()
  // Keep fractions for US units, use decimals for Metric
  if (activeUnitSystem === 'us') {
    if (qty > 0 && qty < 1) {
      if (qty >= 0.24 && qty <= 0.26) formattedQty = '1/4'
      else if (qty >= 0.32 && qty <= 0.34) formattedQty = '1/3'
      else if (qty >= 0.49 && qty <= 0.51) formattedQty = '1/2'
      else if (qty >= 0.65 && qty <= 0.67) formattedQty = '2/3'
      else if (qty >= 0.74 && qty <= 0.76) formattedQty = '3/4'
    } else if (qty > 1 && qty % 1 !== 0) {
      const intPart = Math.floor(qty)
      const fracPart = qty - intPart
      if (fracPart >= 0.49 && fracPart <= 0.51) formattedQty = `${intPart} 1/2`
      else if (fracPart >= 0.24 && fracPart <= 0.26) formattedQty = `${intPart} 1/4`
      else if (fracPart >= 0.74 && fracPart <= 0.76) formattedQty = `${intPart} 3/4`
    }
  }

  // Handle pluralization for US units
  if (activeUnitSystem === 'us' && qty > 1 && !unit.endsWith('s') && unit !== 'oz' && unit !== '') {
    if (!['fluid', 'skinless', 'green', 'salt', 'egg'].includes(unit)) {
       unit += 's'
    }
  }

  return `${formattedQty} ${unit} ${s.name}`.replace(/\s+/g, ' ').trim()
}

export const scrollToActiveStep = function scrollIntoActiveStep(index) {
  setTimeout(() => {
    // looking for a specific class or node. 
    // In DOMQL, we can just use the DOM selector on the document for simplicity if lookdown is hard to target dynamically.
    const activeEl = document.querySelector('.step-active')
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, 100)
}
