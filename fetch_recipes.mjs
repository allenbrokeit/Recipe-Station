import fetch from 'node-fetch';
import fs from 'fs';

const BASE_URL = 'https://raw.githubusercontent.com/dpapathanasiou/recipes/master/index/a/';
const FILES = [
  'a-1-chicken-soup.json',
  'a-20-minute-chicken-parmesan.json',
  'a-fantastic-margarita.json',
  'a-firefighters-meatloaf.json',
  'a-healthy-egg-salad.json'
];

const parseIngredient = (str) => {
  // Matches "1 1/2 cup water" or "2 tbsp sugar"
  const match = str.match(/^([\d\/\s\.]+)?\s*(\w+)?\s*(.*)$/);
  if (match) {
    let qtyStr = (match[1] || '').trim();
    let qty = 0;
    if (qtyStr.includes('/')) {
      const parts = qtyStr.split(/\s+/);
      parts.forEach(p => {
        if (p.includes('/')) {
          const [n, d] = p.split('/');
          qty += parseFloat(n) / parseFloat(d);
        } else {
          qty += parseFloat(p);
        }
      });
    } else {
      qty = parseFloat(qtyStr);
    }
    return {
      baseQuantity: isNaN(qty) ? 1 : qty,
      baseUnit: match[2] || '',
      name: (match[3] || '').trim()
    };
  }
  return { name: str, baseQuantity: 1, baseUnit: '' };
};

const main = async () => {
  const recipes = [];
  
  // Add classic pancakes as the first one
  recipes.push({
    title: 'Classic Pancakes',
    baseYield: 4,
    ingredients: [
      { id: '1', name: 'All-Purpose Flour', baseQuantity: 1.5, baseUnit: 'cup', category: 'dry' },
      { id: '2', name: 'Milk', baseQuantity: 1.25, baseUnit: 'cup', category: 'wet' },
      { id: '3', name: 'Butter', baseQuantity: 2, baseUnit: 'oz', category: 'wet' },
      { id: '4', name: 'Sugar', baseQuantity: 2, baseUnit: 'tbsp', category: 'dry' }
    ],
    instructions: [
      'Mix the dry ingredients together in a large bowl.',
      'Melt the butter and let it cool slightly.',
      'Whisk the milk and melted butter into the dry ingredients.',
      'Heat a pan and pour 1/4 cup of batter for each pancake.',
      'Cook until bubbles form, then flip and cook the other side.'
    ]
  });

  for (const file of FILES) {
    try {
      const res = await fetch(BASE_URL + file);
      const data = await res.json();
      recipes.push({
        title: data.title,
        baseYield: 4, // default fallback
        ingredients: data.ingredients.map((ing, idx) => ({
          id: (recipes.length + 1) + '-' + idx,
          ...parseIngredient(ing)
        })),
        instructions: data.directions
      });
      console.log(`Fetched ${data.title}`);
    } catch (e) {
      console.error(`Error fetching ${file}: ${e.message}`);
    }
  }

  const content = `export default ${JSON.stringify(recipes, null, 2)}`;
  fs.writeFileSync('symbols/recipes.js', content);
};

main();
