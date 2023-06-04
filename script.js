const cats = [
  {
    name: 'Фруктові',
    color: '#000000',
    items: [],
    amount: 0,
  },
  {
    name: 'Ягідні',
    color: '#D86D5E',
    items: ['Полуниця', 'Горобина'],
    amount: 50,
  },
  {
    name: 'Цитрусові',
    color: '#F2C94C',
    items: [],
    amount: 0,
  },
  {
    name: 'Сухофрукти',
    color: '#9C5C5C',
    items: ['Родзинки'],
    amount: 100,
  },
  {
    name: 'Пряні',
    color: '#F2C94C',
    items: [],
    amount: 0,
  },
  {
    name: 'Солодкі',
    color: '#E2AB59',
    items: ['Патока', 'Молочний шоколад'],
    amount: 60,
  },
  {
    name: 'Вершкові',
    color: '#F2C94C',
    items: [],
    amount: 0,
  },
  {
    name: 'Горіхові',
    color: '#F2C94C',
    items: [],
    amount: 0,
  },
  {
    name: 'Солодові',
    color: '#D6CF98',
    items: ['Хліб'],
    amount: 35,
  },
  {
    name: 'Морські',
    color: '#F2C94C',
    items: [],
    amount: 0,
  },
  {
    name: 'Димні',
    color: '#F2C94C',
    items: [],
    amount: 0,
  },
  {
    name: 'Земляні',
    color: '#F2C94C',
    items: [],
    amount: 0,
  },
  {
    name: 'Деревний',
    color: '#7BAB64',
    items: ['Хвоя', 'Смерека'],
    amount: 0,
  },
  {
    name: 'Трав\'яні',
    color: '#A0CF3C',
    items: [],
    amount: 0,
  },
  {
    name: 'Овочеві',
    color: '#F2C94C',
    items: [],
    amount: 0,
  },
  {
    name: 'Квіткові',
    color: '#A0CF3C',
    items: ['Польові квіти'],
    amount: 85,
  },
]
const design = {
  r: 175,
  count: 5,
  color1: '#C0E0B4', 
  color2: '#ABD296', 
  gap: 35,

}
const size = design.r * 2 + design.gap * 2
const ratio = size / 100
const { PI, sin, cos } = Math
const svg = document.querySelector('svg')
const polygon = document.querySelector('polygon')


renderTasteMap(cats, design)

function renderTasteMap(cats, design) {
  const { r, count, color1, color2, gap } = design

  drawCircles(gap, count, color1, color2)
  drawAxis(r, cats.length)
  drawStar(cats, r, gap)
  addLabels(cats, r, gap)
}

function drawStar(cats, r, gap) {
  const points = getStarPoints(cats, r, gap)

  drawPath(points)
}

function getStarPoints(cats, r, gap) {
  const points = []
  const innerPoints = []
  const outerPoints = []
  const total = r + gap
  const shift = PI * 2 / cats.length / 2

  for (let i = 0; i < cats.length; i++) {
    const angle = 2 * PI * (i / cats.length) - PI / 2
    const iX = gap * cos(angle - shift)
    const iY = gap * sin(angle - shift)
    const oX = total * cats[i].amount / 100 * cos(angle)
    const oY = total * cats[i].amount / 100 * sin(angle)

    innerPoints.push([+iX.toFixed(3), +iY.toFixed(3)])
    outerPoints.push([+oX.toFixed(3), +oY.toFixed(3)])
  }

  for (let i = 0; i < cats.length; i++) {
    points.push(innerPoints[i], outerPoints[i])
  }

  return points
}

function drawPath(points) {
  points = points.map(convert)

  const pointsAttrValue = points.map(point => point.join(',')).join(' ')

  polygon.setAttribute('points', pointsAttrValue);
}

function drawAxis(r, count) {

}

function drawCircles(r, count, color1, color2) {
  for (let i = 0; i < count; i++) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    const color = i % 2 ? color1 : color2

    circle.setAttribute('cx', 50)
    circle.setAttribute('cy', 50)
    circle.setAttribute('r', r/ratio * (i + 1))
    circle.setAttribute('fill', color)

    svg.prepend(circle)
    
    if (i === count - 1) {
      circle.setAttribute('filter', 'url(#shadow)')
    }
  }
}

function addLabels(cats, r, gap) {

}

function convert([x, y]) {
  return [x / ratio + 50, y / ratio + 50]
}
