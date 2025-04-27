<template>
   <div class="game-container">
      <h1>Jeu de Dames</h1>
      <div id="status">{{ status }}</div>
      <div id="board-container" ref="boardContainer">
         <table id="board">
            <tr v-for="(row, r) in SIZE" :key="r">
               <td
                  v-for="(col, c) in SIZE"
                  :key="c"
                  :class="getCellClass(SIZE - 1 - r, c)"
                  :data-r="SIZE - 1 - r"
                  :data-c="c"
                  @click="onCellClick(SIZE - 1 - r, c)"
               >
                  <div
                     v-if="board[SIZE - 1 - r][c] !== 0"
                     :class="getPieceClass(board[SIZE - 1 - r][c])"
                  >
                     {{ getPieceSymbol(board[SIZE - 1 - r][c]) }}
                  </div>
               </td>
            </tr>
         </table>
      </div>
   </div>
</template>

<script>
export default {
  name: 'JeuDames',
  data() {
    return {
      SIZE: 10,
      board: [],
      currentPlayer: 1,
      selected: null,
      forcedMoves: null,
      gameEnded: false,
      status: '',
      highlighted: []
    }
  },
  mounted() {
    this.initBoard();
    this.renderBoard();
  },
  methods: {
    initBoard() {
      this.board = Array.from({ length: this.SIZE }, (_, r) =>
        Array.from({ length: this.SIZE }, (_, c) => {
          if (r < 4 && (r + c) % 2 === 0) return 1;
          if (r >= this.SIZE - 4 && (r + c) % 2 === 0) return -1;
          return 0;
        })
      );
    },
    renderBoard() {
      this.status = this.gameEnded ?
        "Fin de la partie" :
        (this.currentPlayer === 1 ? "Au tour des BLANCS" : "Au tour des NOIRS");
    },
    getCellClass(r, c) {
      let base = (r + c) % 2 === 0 ? 'dark' : 'light';
      let isHighlighted = this.highlighted.some(cell => cell.r === r && cell.c === c);
      return { [base]: true, highlight: isHighlighted };
    },
    getPieceClass(piece) {
      const classes = ['piece'];
      if (Math.abs(piece) === 1) {
        classes.push(piece > 0 ? 'white-piece' : 'black-piece');
      } else {
        classes.push(piece > 0 ? 'white-piece' : 'black-piece', 'dame');
      }
      return classes.join(' ');
    },
    getPieceSymbol(piece) {
      if (Math.abs(piece) === 1) return '●';
      return piece > 0 ? '♔' : '♚';
    },
    onCellClick(r, c) {
      if (this.gameEnded) return;
      const piece = this.board[r][c];
      if (this.selected && this.isHighlighted(r, c)) {
        const moves = this.getMovesForPiece(this.selected.r, this.selected.c);
        const chosen = moves.find(mv => mv.path[0].r === r && mv.path[0].c === c);
        if (!chosen) return;

        const fromR = this.selected.r, fromC = this.selected.c;
        const path = chosen.path;
        const captures = chosen.captures;
        const final = path[path.length - 1];

        this.animateMove(fromR, fromC, path, piece, captures, () => {
          if (Math.abs(piece) === 1) {
            if ((piece === 1 && final.r === this.SIZE - 1) || (piece === -1 && final.r === 0)) {
              this.board[final.r][final.c] = piece > 0 ? 2 : -2;
            }
          }
          const newPiece = this.board[final.r][final.c];
          const further = this.getCaptures(final.r, final.c, this.board, newPiece);
          if (captures.length > 0 && further.length > 0) {
            this.selected = { r: final.r, c: final.c };
            this.clearHighlights();
            this.highlightCell(final.r, final.c);
            further.forEach(mv => this.highlightCell(mv.path[0].r, mv.path[0].c));
            this.status = "Multi-capture obligatoire avec la même pièce";
            return;
          }
          if (this.checkGameOver()) return;
          this.currentPlayer *= -1;
          this.clearHighlights();
          this.selected = null;
          this.status = this.currentPlayer === 1 ? "Au tour des BLANCS" : "Au tour des NOIRS";
        });
        return;
      }
      if (piece * this.currentPlayer > 0) {
        this.forcedMoves = this.getAllForcedMoves(this.currentPlayer);
        if (this.forcedMoves.length > 0 && !this.forcedMoves.some(m => m.from.r === r && m.from.c === c)) {
          this.status = "Vous devez effectuer une prise obligatoire !";
          return;
        }
        this.selected = { r, c };
        this.clearHighlights();
        this.highlightCell(r, c);
        let moves = this.getMovesForPiece(r, c);
        if (this.forcedMoves && this.forcedMoves.length > 0) {
          moves = moves.filter(mv => mv.captures.length > 0);
        }
        moves.forEach(mv => this.highlightCell(mv.path[0].r, mv.path[0].c));
      }
    },
    isHighlighted(r, c) {
      return this.highlighted.some(cell => cell.r === r && cell.c === c);
    },

    highlightCell(r, c) {
      this.highlighted.push({ r, c });
    },

    clearHighlights() {
      this.highlighted = [];
    },

    checkGameOver() {
         let white = 0,
            black = 0;
         for (let row of this.board) {
            for (let cell of row) {
               if (cell > 0) white++;
               if (cell < 0) black++;
            }
         }
         if (white === 0 || black === 0) {
            this.gameEnded = true;
            this.status = `Fin de la partie : ${white === 0 ? 'NOIRS' : 'BLANCS'} ont dadadagagné !`;
            if (white === 0) {
              console.log("ca marche")
              this.updateUserScore(this.user2.username, black);
            } else {
              console.log("ca marche2")
              this.updateUserScore(this.user1.username, white);
            }
            return true;
         }
         let hasMove = false;
         for (let r = 0; r < this.SIZE; r++) {
            for (let c = 0; c < this.SIZE; c++) {
               if (this.board[r][c] * this.currentPlayer > 0) {
                  if (this.getMovesForPiece(r, c).length > 0) {
                     hasMove = true;
                     break;
                  }
               }
            }
         }
         if (!hasMove) {
            this.gameEnded = true;
            this.status = `Fin de la partie : ${
               this.currentPlayer === 1 ? 'NOIRS' : 'BLANCS'
            } ont blblblgagné !`;
            return true;
         }
         return false;
      },

    getAllForcedMoves(player) {
      let moves = [];
      for (let r = 0; r < this.SIZE; r++) {
        for (let c = 0; c < this.SIZE; c++) {
          if (this.board[r][c] * player > 0) {
            let caps = this.getCaptures(r, c, this.board, this.board[r][c]);
            if (caps.length > 0) {
              moves.push({ from: { r, c }, moves: caps });
            }
          }
        }
      }
      let maxCapt = 0;
      moves.forEach(item => {
        item.moves.forEach(seq => {
          if (seq.captures.length > maxCapt) maxCapt = seq.captures.length;
        });
      });
      moves.forEach(item => {
        item.moves = item.moves.filter(seq => seq.captures.length === maxCapt);
      });
      return moves.filter(item => item.moves.length > 0);
    },
    getMovesForPiece(r, c) {
      const piece = this.board[r][c];
      let moves = this.getCaptures(r, c, this.board, piece);
      if (moves.length === 0) {
        moves = this.getSimpleMoves(r, c, this.board, piece);
      }
      return moves;
    },
    getSimpleMoves(r, c, board, piece) {
      let moves = [];
      let dirs = [];
      const directions = [
        { dr: 1, dc: 1 }, { dr: 1, dc: -1 }, { dr: -1, dc: 1 }, { dr: -1, dc: -1 }
      ];
      if (Math.abs(piece) === 1) {
        let fwd = piece === 1 ? 1 : -1;
        dirs = [{ dr: fwd, dc: 1 }, { dr: fwd, dc: -1 }];
      } else {
        dirs = directions;
      }
      for (let d of dirs) {
        let nr = r + d.dr, nc = c + d.dc;
        if (Math.abs(piece) === 1 && this.inBounds(nr, nc) && board[nr][nc] === 0) {
          moves.push({ path: [{ r: nr, c: nc }], captures: [] });
        } else if (Math.abs(piece) !== 1) {
          while (this.inBounds(nr, nc) && board[nr][nc] === 0) {
            moves.push({ path: [{ r: nr, c: nc }], captures: [] });
            nr += d.dr;
            nc += d.dc;
          }
        }
      }
      return moves;
    },
    getCaptures(r, c, boardState, piece, capturedAlready = []) {
      let moves = [];
      const directions = [
        { dr: 1, dc: 1 }, { dr: 1, dc: -1 }, { dr: -1, dc: 1 }, { dr: -1, dc: -1 }
      ];
      let dirs = Math.abs(piece) === 1 && capturedAlready.length === 0 ?
        [{ dr: piece === 1 ? 1 : -1, dc: 1 }, { dr: piece === 1 ? 1 : -1, dc: -1 }] : directions;

      for (let d of dirs) {
        if (Math.abs(piece) === 1) {
          let midR = r + d.dr, midC = c + d.dc;
          let endR = r + 2 * d.dr, endC = c + 2 * d.dc;
          if (this.inBounds(endR, endC) && boardState[midR][midC] * piece < 0 && boardState[endR][endC] === 0) {
            if (!capturedAlready.some(pos => pos.r === midR && pos.c === midC)) {
              let newBoard = boardState.map(row => [...row]);
              newBoard[r][c] = 0;
              newBoard[midR][midC] = 0;
              newBoard[endR][endC] = piece;
              let newCaptured = capturedAlready.concat([{ r: midR, c: midC }]);
              let further = this.getCaptures(endR, endC, newBoard, piece, newCaptured);
              if (further.length > 0) {
                for (let seq of further) {
                  moves.push({
                    path: [{ r: endR, c: endC }, ...seq.path],
                    captures: [{ r: midR, c: midC }, ...seq.captures]
                  });
                }
              } else {
                moves.push({ path: [{ r: endR, c: endC }], captures: [{ r: midR, c: midC }] });
              }
            }
          }
        }
        // Dame capture omitted for brevity — can be added as needed
      }
      return moves;
    },
    inBounds(r, c) {
      return r >= 0 && r < this.SIZE && c >= 0 && c < this.SIZE;
    },
    animateMove(fromR, fromC, path, piece, captures, callback) {
      const container = this.$refs.boardContainer;
      const temp = document.createElement("div");
      temp.className = this.getPieceClass(piece);
      temp.classList.add("piece");
      temp.textContent = this.getPieceSymbol(piece);
      temp.style.position = "absolute";
      temp.style.transition = "left 0.3s ease, top 0.3s ease";
      temp.style.zIndex = 1000;

      const sampleCell = container.querySelector("td");
      if (sampleCell) {
        const cellWidth = sampleCell.offsetWidth;
        const pieceSize = cellWidth * 0.8;
        temp.style.width = pieceSize + "px";
        temp.style.height = pieceSize + "px";
        temp.style.lineHeight = pieceSize + "px";
        temp.style.fontSize = "36px";
      }

      const getCellPos = (r, c) => {
        const cell = container.querySelector(`td[data-r='${r}'][data-c='${c}']`);
        const crect = container.getBoundingClientRect();
        const rct = cell.getBoundingClientRect();
        return { left: rct.left - crect.left, top: rct.top - crect.top };
      }

      const startPos = getCellPos(fromR, fromC);
      temp.style.left = startPos.left + "px";
      temp.style.top = startPos.top + "px";
      container.appendChild(temp);
      this.board[fromR][fromC] = 0;
      this.renderBoard();

      let steps = [{ r: fromR, c: fromC }, ...path];
      let index = 0;

      const nextStep = () => {
        if (index >= steps.length - 1) {
          const last = steps[steps.length - 1];
          this.board[last.r][last.c] = piece;
          container.removeChild(temp);
          this.renderBoard();
          callback();
          return;
        }
        index++;
        if (index - 1 < captures.length) {
          let cap = captures[index - 1];
          if (cap) {
            this.board[cap.r][cap.c] = 0;
            let cell = container.querySelector(`td[data-r='${cap.r}'][data-c='${cap.c}']`);
            if (cell) cell.innerHTML = "";
          }
        }
        const pos = getCellPos(steps[index].r, steps[index].c);
        temp.style.left = pos.left + "px";
        temp.style.top = pos.top + "px";
        temp.addEventListener("transitionend", onTrans);
      }

      const onTrans = () => {
        temp.removeEventListener("transitionend", onTrans);
        nextStep();
      }

      nextStep();
    }
  }
}

async updateUserScore(username, newScore) {
         try {
            const response = await fetch('http://localhost:3000/update', {
               // adapte l'URL si besoin
               method: 'PUT',
               headers: {
                  'Content-Type': 'application/json',
               },
               console.log("update de score")
               body: JSON.stringify({
                  username: username,
                  newScore: newScore,
               }),
            });

            const data = await response.json();

            if (response.ok) {
               console.log('✅ Score mis à jour:', data.user);
            } else {
               console.error('❌ Erreur mise à jour:', data.message);
            }
         } catch (error) {
            console.error('❌ Erreur réseau:', error.message);
         }
      },
</script>

<style scoped>
body {
   font-family: sans-serif;
   text-align: center;
   width: 100%;
   border: 1px solid red;
}
/* Conteneur pour permettre le positionnement absolu du pion animé */
#board-container {
   position: relative;
   display: inline-block;
}
#board {
   margin: 20px auto;
   border-collapse: collapse;
   border-radius: 20px;
   overflow: hidden;
   box-shadow: 0 5px 20px rgba(0, 0, 0, 0.469);
}
#board td {
   width: 60px;
   height: 60px;
   text-align: center;
   vertical-align: middle;
   font-size: 36px;
   cursor: pointer;
   position: relative;
}
.light {
   background-color: #eee;
}
.dark {
   background-color: #555;
   color: white;
}
.piece {
   display: inline-block;
   width: 80%;
   height: 80%;
   border-radius: 50%;
   line-height: 60px;
   text-align: center;
   font-weight: bold;
}
.white-piece {
   background-color: #fff;
   box-shadow: 0 5px 10px rgba(0, 0, 0, 0.724);
}
.black-piece {
   background-color: #000;
   color: #000;
   box-shadow: 0 5px 10px rgba(0, 0, 0, 0.724);
}
.dame {
   box-shadow: 0 0 0 3px gold inset;
}
.selected {
   outline: 3px solid yellow;
}
.highlight {
   background-color: #88cc88 !important;
}
</style>
