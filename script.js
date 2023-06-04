const cats = [
  {
    name: 'Фруктові',
    color: '#000000',
    items: [],
    amount: 5,
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
    amount: 40,
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
    amount: 90,
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
    amount: 80,
  },
  {
    name: 'Горіхові',
    color: '#F2C94C',
    items: [],
    amount: 33,
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
    amount: 7,
  },
  {
    name: 'Димні',
    color: '#F2C94C',
    items: [],
    amount: 2,
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
    amount: 19,
  },
  {
    name: 'Трав\'яні',
    color: '#A0CF3C',
    items: [],
    amount: 40,
  },
  {
    name: 'Овочеві',
    color: '#F2C94C',
    items: [],
    amount: 30,
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
const cx = 100
const cy = 65
const size = design.r * 2 + design.gap * 2
const ratio = size / 100
const { PI, sin, cos } = Math
const svg = document.querySelector('svg')
const polygon = document.querySelector('polygon')
const labelGroup = document.querySelector('g')


renderTasteMap(cats, design)

function renderTasteMap(cats, design) {
  const { r, count, color1, color2, gap } = design
  const points = drawAxis(r + gap, cats.length)

  drawCircles(gap, count, color1, color2)
  drawStar(cats, r, gap)
  addLabels(points, cats, r, gap)
}

function drawStar(cats, r, gap) {
  const points = getStarPoints(cats, r, gap)

  drawPath(points)
}

function getStarPoints(cats, r, gap) {
  const points = []
  const innerPoints = []
  const outerPoints = []
  const shift = PI * 2 / cats.length / 2

  for (let i = 0; i < cats.length; i++) {
    const angle = 2 * PI * (i / cats.length) - PI / 2
    const iX = gap * cos(angle - shift)
    const iY = gap * sin(angle - shift)
    const oX = ((r * cats[i].amount / 100) + gap) * cos(angle)
    const oY = ((r * cats[i].amount / 100) + gap) * sin(angle)

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
  const points = []

  for (let i = 0; i < count; i++) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    const angle = 2 * PI * (i / count) - PI / 2
    const x = r * cos(angle)
    const y = r * sin(angle)
    const point = convert([x, y])

    line.setAttribute('x1', cx)
    line.setAttribute('y1', cy)
    line.setAttribute('x2', point[0])
    line.setAttribute('y2', point[1])
    line.setAttribute('stroke', '#000000')
    line.setAttribute('stroke-width', 0.1)
    line.setAttribute('stroke-dasharray', '2 1')

    svg.prepend(line)
    points.push(point)
  }

  return points
}

function drawCircles(r, count, color1, color2) {
  for (let i = 0; i < count; i++) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    const color = i % 2 ? color1 : color2

    circle.setAttribute('cx', cx)
    circle.setAttribute('cy', cy)
    circle.setAttribute('r', r / ratio * (i + 1))
    circle.setAttribute('fill', color)

    svg.prepend(circle)

    if (i === count - 1) {
      circle.setAttribute('filter', 'url(#shadow)')
    }
  }
}

function addLabels(points, cats, r, gap) {
  for (let i = 0; i < cats.length; i++) {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    const angle = 2 * PI * (i / cats.length) - PI / 2
    const x = (r + gap) * cos(angle)
    const y = (r + gap) * sin(angle)
    const point = convert([x, y])

    text.setAttribute('x', point[0] + 2)
    text.setAttribute('y', point[1])
    text.setAttribute('dominant-baseline', 'middle')
    text.setAttribute('font-size', '4')
    text.setAttribute('font-weight', 'bold')
    text.textContent = cats[i].name

    if (i > cats.length / 2) {
      text.setAttribute('text-anchor', 'end')
      text.setAttribute('x', point[0] - 2)
    } else if (!i) {
      text.setAttribute('x', point[0])
      text.setAttribute('y', point[1] - 2)
      text.setAttribute('text-anchor', 'middle')
      text.setAttribute('dominant-baseline', 'auto')
    } else if (i == cats.length / 2) {
      text.setAttribute('x', point[0])
      text.setAttribute('y', point[1] + 1)
      text.setAttribute('text-anchor', 'middle')
      text.setAttribute('dominant-baseline', 'hanging')
    }

    labelGroup.prepend(text)
  }

}

function convert([x, y]) {
  return [x / ratio + cx, y / ratio + cy]
}
