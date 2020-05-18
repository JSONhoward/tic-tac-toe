let gridArray = Array(9).fill('-'),
    player1 = true,
    moveCount = 0,
    endGame = true,
    button = document.getElementById('start-stop'),
    overlay = document.getElementById('overlay'),
    playerX = document.getElementById('player-x'),
    playerO = document.getElementById('player-o'),
    winnerX = document.getElementById('winnerX'),
    winnerO = document.getElementById('winnerO')

const changePlayer = () => player1 = !player1

const markSquare = event => {
    if (!endGame) {
        const id = event.target.id
        const gridNum = Number(id.slice(-1))

        if (player1 && event.target.innerHTML === '') {
            gridArray[gridNum] = 'x'
            event.target.innerHTML = 'x'
            playerX.classList.remove('active-player')
            playerO.classList.add('active-player')
            moveCount++
            checkWinner('x')
            changePlayer()
        } else if (!player1 && event.target.innerHTML === '') {
            gridArray[gridNum] = 'o'
            event.target.innerHTML = 'o'
            playerO.classList.remove('active-player')
            playerX.classList.add('active-player')
            moveCount++
            checkWinner('o')
            changePlayer()
        }

        if (moveCount >= 9) {
            handleEndGame()
        }
    }
}

const checkWinner = letter => {
    const winningPositions = {
        pos1: { pattern: gridArray[0] + gridArray[1] + gridArray[2], squares: [0, 1, 2] },
        pos2: { pattern: gridArray[3] + gridArray[4] + gridArray[5], squares: [3, 4, 5] },
        pos3: { pattern: gridArray[6] + gridArray[7] + gridArray[8], squares: [6, 7, 8] },
        pos4: { pattern: gridArray[0] + gridArray[3] + gridArray[6], squares: [0, 3, 6] },
        pos5: { pattern: gridArray[1] + gridArray[4] + gridArray[7], squares: [1, 4, 7] },
        pos6: { pattern: gridArray[2] + gridArray[5] + gridArray[8], squares: [2, 5, 8] },
        pos7: { pattern: gridArray[0] + gridArray[4] + gridArray[8], squares: [0, 4, 8] },
        pos8: { pattern: gridArray[6] + gridArray[4] + gridArray[2], squares: [6, 4, 2] }
    }

    for (let positions in winningPositions) {
        if (winningPositions[positions].pattern === `${letter}${letter}${letter}`) {
            letter === 'x' ? winnerX.style.display = 'block' : winnerO.style.display = 'block'

            const squares = winningPositions[positions].squares
            for (let i = 0; i < 9; i++) {
                if (i != squares[0] && i != squares[1] && i != squares[2]) {
                    document.getElementById(`square${i}`).style.backgroundColor = 'rgb(60,60,60)'
                }
            }

            handleEndGame()
            return
        }
    }
}

const handleEndGame = () => {
    endGame = true
    player1 = true
    moveCount = 0
    playerX.classList.remove('active-player')
    playerO.classList.remove('active-player')
    overlay.style.display = 'flex'
    button.style.backgroundColor = 'green'
    button.style.borderColor = 'green'
    button.innerText = 'Start'
}

const handleStartGame = () => {
    endGame = false
    overlay.style.display = 'none'
    playerX.classList.add('active-player')
    button.style.backgroundColor = 'red'
    button.style.borderColor = 'red'
    button.innerText = 'End Game'
    winnerX.style.display = 'none'
    winnerO.style.display = 'none'
    clearSquares()
}

const clearSquares = () => {
    gridArray = Array(9).fill('-')
    const arr = [...main.childNodes]
    arr.forEach(child => {
        if (child.id !== 'overlay') {
            child.innerText = ''
            if (child.classList) {
                child.style.backgroundColor = 'whitesmoke'
            }
        }

    })
}

(() => {
    const arr = [...main.childNodes]
    arr.forEach(child => {
        child.addEventListener('click', markSquare)
    })
    button.addEventListener('click', () => {
        if (endGame) {
            handleStartGame()
        } else {
            handleEndGame()
        }
    })
})()