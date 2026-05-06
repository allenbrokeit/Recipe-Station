export const formatIngredient = function formatIngredient(s, targetYield, baseYield, activeUnitSystem) {
  if (!s) return ''
  if (!s.baseQuantity) return s.name || ''
  let qty = s.baseQuantity * (targetYield / baseYield)
  let unit = s.baseUnit || ''
  
  if (activeUnitSystem === 'metric' && unit === 'cup') {
    qty = qty * 236.588; unit = 'ml'
  } else if (activeUnitSystem === 'metric' && unit === 'oz') {
    qty = qty * 28.3495; unit = 'g'
  } else if (activeUnitSystem === 'us' && unit === 'ml') {
    qty = qty / 236.588; unit = 'cup'
  } else if (activeUnitSystem === 'us' && unit === 'g') {
    qty = qty / 28.3495; unit = 'oz'
  }
  
  qty = Math.round(qty * 100) / 100
  
  let formattedQty = qty.toString()
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

  return `${formattedQty} ${unit} ${s.name}`
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
