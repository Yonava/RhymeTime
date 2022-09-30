let sol = []
let arr = [2, 5, 54, 43, 223, 24, -5, 1, 23, 131, 2, -3, 1]
let holding = 0
let error = false

arr = arr.reverse()

for (let i=0; i < arr.length; i++) {
  if (arr[i] < 0 && !holding) {
    holding = 4
  }

  else if (arr[i] < 0 && holding) {
    error = true
  }

  else if (!holding) {
    sol.push(arr[i])
  }

  else {
    holding--
  }
}

console.log(error ? 'ERROR' : sol.reverse())