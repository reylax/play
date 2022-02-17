const a = async () => {
  b = 0
  for (i=0; i < 10; i++) {
    b += 1
    console.log(b)
  }
}

['1', 2, 3].forEach(() => a())