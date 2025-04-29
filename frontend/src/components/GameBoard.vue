<template>
  <div class="layout">
    <!-- Colonne CENTRALE -->
    <div class="board-col">
      <h1>Jeu de Dames</h1>
      <div id="status" class="status"></div>

      <div class="player-name">Joueur NOIR : {{ blackPlayerName }}</div>

      <div id="board-container">
        <table id="board"></table>
      </div>
      <div class="player-name">Joueur BLANC : {{ whitePlayerName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameBoard",
  props: {
    users: {
      type: Array,
      required: true,
      validator: (v) =>
        Array.isArray(v) && v.length === 2 && v.every((u) => "username" in u),
    },
  },
  data() {
    return {
      SIZE: 10,
      board: [],
      currentPlayer: 1,
      selected: null,
      forcedMoves: null,
      gameEnded: false,
    };
  },
  computed: {
    blackPlayerName() {
      return this.users[0].username;
    },
    whitePlayerName() {
      return this.users[1].username;
    },
  },
  methods: {
    initBoard() {
      this.board = Array.from({ length: this.SIZE }, () =>
        Array(this.SIZE).fill(0)
      );
      // blancs (utilisateur 2) en bas
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < this.SIZE; c++) {
          if ((r + c) % 2 === 0) this.board[r][c] = 1;
        }
      }
      // noirs (utilisateur 1) en haut
      for (let r = this.SIZE - 4; r < this.SIZE; r++) {
        for (let c = 0; c < this.SIZE; c++) {
          if ((r + c) % 2 === 0) this.board[r][c] = -1;
        }
      }
    },
    renderBoard() {
      const table = document.getElementById("board");
      table.innerHTML = "";
      for (let r = this.SIZE - 1; r >= 0; r--) {
        const row = document.createElement("tr");
        for (let c = 0; c < this.SIZE; c++) {
          const cell = document.createElement("td");
          cell.className = (r + c) % 2 === 0 ? "dark" : "light";
          cell.dataset.r = r;
          cell.dataset.c = c;
          cell.addEventListener("click", this.onCellClick);
          let piece = this.board[r][c];
          if (piece !== 0) {
            const pieceDiv = document.createElement("div");
            pieceDiv.classList.add("piece");
            if (Math.abs(piece) === 1) {
              if (piece === 1) {
                pieceDiv.classList.add("white-piece");
                pieceDiv.textContent = "●";
              } else {
                pieceDiv.classList.add("black-piece");
                pieceDiv.textContent = "●";
              }
            } else {
              if (piece === 2) {
                pieceDiv.classList.add("white-piece", "dame");
                pieceDiv.textContent = "♔";
              } else {
                pieceDiv.classList.add("black-piece", "dame");
                pieceDiv.textContent = "♚";
              }
            }
            cell.appendChild(pieceDiv);
          }
          row.appendChild(cell);
        }
        table.appendChild(row);
      }
      document.getElementById("status").textContent = this.gameEnded
        ? "Fin de la partie"
        : this.currentPlayer === 1
        ? "Au tour des BLANCS"
        : "Au tour des NOIRS";
    },
    inBounds(r, c) {
      return r >= 0 && r < this.SIZE && c >= 0 && c < this.SIZE;
    },
    cloneBoard(b) {
      return b.map((row) => row.slice());
    },
    getSimpleMoves(r, c, board, piece) {
      let moves = [];
      let dirs = [];
      if (Math.abs(piece) === 1) {
        const forward = piece === 1 ? 1 : -1;
        dirs = [
          { dr: forward, dc: 1 },
          { dr: forward, dc: -1 },
        ];
      } else {
        dirs = [
          { dr: 1, dc: 1 },
          { dr: 1, dc: -1 },
          { dr: -1, dc: 1 },
          { dr: -1, dc: -1 },
        ];
      }
      for (let d of dirs) {
        if (Math.abs(piece) === 1) {
          const nr = r + d.dr,
            nc = c + d.dc;
          if (this.inBounds(nr, nc) && board[nr][nc] === 0) {
            moves.push({ path: [{ r: nr, c: nc }], captures: [] });
          }
        } else {
          let nr = r + d.dr,
            nc = c + d.dc;
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
      let dirs;
      if (Math.abs(piece) === 1 && capturedAlready.length === 0) {
        const forward = piece === 1 ? 1 : -1;
        dirs = [
          { dr: forward, dc: 1 },
          { dr: forward, dc: -1 },
        ];
      } else {
        dirs = [
          { dr: 1, dc: 1 },
          { dr: 1, dc: -1 },
          { dr: -1, dc: 1 },
          { dr: -1, dc: -1 },
        ];
      }
      for (let d of dirs) {
        if (Math.abs(piece) === 1) {
          const midR = r + d.dr,
            midC = c + d.dc;
          const endR = r + 2 * d.dr,
            endC = c + 2 * d.dc;
          if (
            this.inBounds(endR, endC) &&
            boardState[midR][midC] * piece < 0 &&
            boardState[endR][endC] === 0
          ) {
            if (
              !capturedAlready.some((pos) => pos.r === midR && pos.c === midC)
            ) {
              const newBoard = this.cloneBoard(boardState);
              newBoard[r][c] = 0;
              newBoard[midR][midC] = 0;
              newBoard[endR][endC] = piece;
              if (Math.abs(piece) === 1) {
                if (
                  (piece === 1 && endR === this.SIZE - 1) ||
                  (piece === -1 && endR === 0)
                ) {
                  newBoard[endR][endC] = piece > 0 ? 2 : -2;
                }
              }
              const newCaptured = capturedAlready.concat([
                { r: midR, c: midC },
              ]);
              const further = this.getCaptures(
                endR,
                endC,
                newBoard,
                newBoard[endR][endC],
                newCaptured
              );
              if (further.length > 0) {
                for (let seq of further) {
                  moves.push({
                    path: [{ r: endR, c: endC }].concat(seq.path),
                    captures: [{ r: midR, c: midC }].concat(seq.captures),
                  });
                }
              } else {
                moves.push({
                  path: [{ r: endR, c: endC }],
                  captures: [{ r: midR, c: midC }],
                });
              }
            }
          }
        } else {
          let nr = r + d.dr,
            nc = c + d.dc;
          while (this.inBounds(nr, nc) && boardState[nr][nc] === 0) {
            nr += d.dr;
            nc += d.dc;
          }
          if (this.inBounds(nr, nc) && boardState[nr][nc] * piece < 0) {
            let jumpR = nr + d.dr,
              jumpC = nc + d.dc;
            while (
              this.inBounds(jumpR, jumpC) &&
              boardState[jumpR][jumpC] === 0
            ) {
              if (
                !capturedAlready.some((pos) => pos.r === nr && pos.c === nc)
              ) {
                const newBoard = this.cloneBoard(boardState);
                newBoard[r][c] = 0;
                newBoard[nr][nc] = 0;
                newBoard[jumpR][jumpC] = piece;
                const newCaptured = capturedAlready.concat([{ r: nr, c: nc }]);
                const further = this.getCaptures(
                  jumpR,
                  jumpC,
                  newBoard,
                  piece,
                  newCaptured
                );
                if (further.length > 0) {
                  for (let seq of further) {
                    moves.push({
                      path: [{ r: jumpR, c: jumpC }].concat(seq.path),
                      captures: [{ r: nr, c: nc }].concat(seq.captures),
                    });
                  }
                } else {
                  moves.push({
                    path: [{ r: jumpR, c: jumpC }],
                    captures: [{ r: nr, c: nc }],
                  });
                }
              }
              jumpR += d.dr;
              jumpC += d.dc;
            }
          }
        }
      }
      return moves;
    },
    getMovesForPiece(r, c) {
      const piece = this.board[r][c];
      let moves = this.getCaptures(r, c, this.board, piece);
      if (moves.length === 0)
        moves = this.getSimpleMoves(r, c, this.board, piece);
      return moves;
    },
    getAllForcedMoves(player) {
      let moves = [];
      for (let r = 0; r < this.SIZE; r++) {
        for (let c = 0; c < this.SIZE; c++) {
          if (this.board[r][c] * player > 0) {
            let caps = this.getCaptures(r, c, this.board, this.board[r][c]);
            if (caps.length) moves.push({ from: { r, c }, moves: caps });
          }
        }
      }
      let maxCapt = 0;
      moves.forEach((item) =>
        item.moves.forEach((seq) => {
          if (seq.captures.length > maxCapt) maxCapt = seq.captures.length;
        })
      );
      moves.forEach((item) => {
        item.moves = item.moves.filter(
          (seq) => seq.captures.length === maxCapt
        );
      });
      return moves.filter((item) => item.moves.length);
    },

    checkGameOver() {
      let whiteCount = 0,
        blackCount = 0;
      for (let r = 0; r < this.SIZE; r++)
        for (let c = 0; c < this.SIZE; c++) {
          if (this.board[r][c] > 0) whiteCount++;
          if (this.board[r][c] < 0) blackCount++;
        }
      if (!whiteCount || !blackCount) {
        this.gameEnded = true;
        const winnerName = whiteCount
          ? this.whitePlayerName
          : this.blackPlayerName;
        this.updateStatus("Fin de la partie : " + winnerName + " a gagné !");
        if (whiteCount === 0) {
          this.updateUserAfterGame(this.users[0].username, 1, blackCount);
        } else {
          this.updateUserAfterGame(this.users[1].username, 2, whiteCount);
        }
        return true;
      }
      let hasMove = false;
      for (let r = 0; r < this.SIZE && !hasMove; r++)
        for (let c = 0; c < this.SIZE; c++) {
          if (
            this.board[r][c] * this.currentPlayer > 0 &&
            this.getMovesForPiece(r, c).length
          ) {
            hasMove = true;
            break;
          }
        }
      if (!hasMove) {
        this.gameEnded = true;
        const winner = this.currentPlayer === 1 ? "NOIRS" : "BLANCS";
        this.updateStatus("Fin de la partie : " + winner + " ont gagné !");
        return true;
      }
      return false;
    },

    animateMove(fromR, fromC, path, piece, captures, callback) {
      const container = document.getElementById("board-container");
      const tempPiece = document.createElement("div");
      tempPiece.classList.add("piece");
      if (Math.abs(piece) === 1) {
        if (piece === 1) {
          tempPiece.classList.add("white-piece");
          tempPiece.textContent = "●";
        } else {
          tempPiece.classList.add("black-piece");
          tempPiece.textContent = "●";
        }
      } else {
        if (piece === 2) {
          tempPiece.classList.add("white-piece", "dame");
          tempPiece.textContent = "♔";
        } else {
          tempPiece.classList.add("black-piece", "dame");
          tempPiece.textContent = "♚";
        }
      }
      tempPiece.style.position = "absolute";
      tempPiece.style.transition = "left 0.3s ease, top 0.3s ease";
      tempPiece.style.zIndex = "1000";

      const sampleCell = document.querySelector("#board td");
      if (sampleCell) {
        const cellWidth = sampleCell.offsetWidth;
        const size = cellWidth * 0.8;
        tempPiece.style.width = size + "px";
        tempPiece.style.height = size + "px";
        tempPiece.style.lineHeight = size + "px";
        tempPiece.style.fontSize = "36px";
      }
      function getCellPosition(r, c) {
        const cell = document.querySelector(
          `#board td[data-r='${r}'][data-c='${c}']`
        );
        const contRect = container.getBoundingClientRect();
        const cellRect = cell.getBoundingClientRect();
        return {
          left: cellRect.left - contRect.left,
          top: cellRect.top - contRect.top,
        };
      }
      const start = getCellPosition(fromR, fromC);
      tempPiece.style.left = start.left + "px";
      tempPiece.style.top = start.top + "px";
      container.appendChild(tempPiece);
      this.board[fromR][fromC] = 0;
      this.renderBoard();
      const steps = [{ r: fromR, c: fromC }].concat(path);
      let idx = 0;
      const next = () => {
        if (idx >= steps.length - 1) {
          const final = steps[steps.length - 1];
          this.board[final.r][final.c] = piece;
          container.removeChild(tempPiece);
          this.renderBoard();
          callback && callback();
          return;
        }
        idx++;
        if (idx - 1 < captures.length) {
          const cap = captures[idx - 1];
          this.board[cap.r][cap.c] = 0;
          const capEl = document.querySelector(
            `#board td[data-r='${cap.r}'][data-c='${cap.c}']`
          );
          if (capEl) capEl.innerHTML = "";
        }
        const pos = steps[idx];
        const { left, top } = getCellPosition(pos.r, pos.c);
        tempPiece.style.left = left + "px";
        tempPiece.style.top = top + "px";
        tempPiece.addEventListener("transitionend", onTransEnd);
      };
      function onTransEnd() {
        tempPiece.removeEventListener("transitionend", onTransEnd);
        next();
      }
      next();
    },
    onCellClick(e) {
      if (this.gameEnded) return;
      const r = +e.currentTarget.dataset.r,
        c = +e.currentTarget.dataset.c;
      if (this.selected && e.currentTarget.classList.contains("highlight")) {
        const possible = this.getMovesForPiece(
          this.selected.r,
          this.selected.c
        );
        const chosen = possible.find(
          (mv) => mv.path[0].r === r && mv.path[0].c === c
        );
        if (!chosen) return;
        const piece = this.board[this.selected.r][this.selected.c];
        this.animateMove(
          this.selected.r,
          this.selected.c,
          chosen.path,
          piece,
          chosen.captures,
          () => {
            const final = chosen.path[chosen.path.length - 1];
            if (
              Math.abs(piece) === 1 &&
              ((piece === 1 && final.r === this.SIZE - 1) ||
                (piece === -1 && final.r === 0))
            ) {
              this.board[final.r][final.c] = piece > 0 ? 2 : -2;
            }
            this.renderBoard();
            const newPiece = this.board[final.r][final.c];
            const fut = this.getCaptures(
              final.r,
              final.c,
              this.board,
              newPiece
            );
            if (chosen.captures.length && fut.length) {
              this.selected = { r: final.r, c: final.c };
              this.clearHighlights();
              this.highlightCell(final.r, final.c);
              fut.forEach((mv) =>
                this.highlightCell(mv.path[0].r, mv.path[0].c)
              );
              this.updateStatus("Multi-capture obligatoire avec la même pièce");
              return;
            }
            if (this.checkGameOver()) return;
            this.currentPlayer *= -1;
            this.clearHighlights();
            this.selected = null;
            this.updateStatus(
              this.currentPlayer === 1
                ? "Au tour des BLANCS"
                : "Au tour des NOIRS"
            );
          }
        );
        return;
      }
      if (this.board[r][c] * this.currentPlayer > 0) {
        this.forcedMoves = this.getAllForcedMoves(this.currentPlayer);
        if (
          this.forcedMoves.length &&
          !this.forcedMoves.some(
            (item) => item.from.r === r && item.from.c === c
          )
        ) {
          this.updateStatus("Vous devez effectuer une prise obligatoire !");
          return;
        }
        this.selected = { r, c };
        this.clearHighlights();
        this.highlightCell(r, c);
        let moves = this.getMovesForPiece(r, c);
        if (this.forcedMoves.length)
          moves = moves.filter((mv) => mv.captures.length);
        moves.forEach((mv) => this.highlightCell(mv.path[0].r, mv.path[0].c));
      }
    },
    highlightCell(r, c) {
      document.querySelectorAll("#board td").forEach((cell) => {
        if (+cell.dataset.r === r && +cell.dataset.c === c)
          cell.classList.add("highlight");
      });
    },
    clearHighlights() {
      document
        .querySelectorAll("#board td")
        .forEach((cell) => cell.classList.remove("highlight"));
    },
    updateStatus(msg) {
      document.getElementById("status").textContent = msg;
    },

    async updateUserAfterGame(username, userIndex, pointsGagnes) {
      try {
        const response = await fetch("http://localhost:3000/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            newScore: pointsGagnes,
            newEmission: 0.0000183, // ou autre émission si besoin
          }),
        });
        const data = await response.json();
        if (response.ok) {
          console.log("✅ Score mis à jour :", data.user);
          // Maintenant tu updates localement :
          this.$emit("update-user", { userId: userIndex, userData: data.user });
        } else {
          console.error("❌ Erreur update:", data.message);
        }
      } catch (err) {
        console.error("❌ Erreur réseau:", err.message);
      }
    },
  },
  mounted() {
    this.initBoard();
    this.renderBoard();
  },
};
</script>

<style>
/* Conteneur pour permettre le positionnement absolu du pion animé */
#board-container {
  position: relative;
  min-width: 600px;
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

body,
html {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}

#app {
  width: 100%;
}

#board-container {
  position: relative;
  display: inline-block;
}

.layout {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 50px;
  width: 100%;
  padding: 40px 20px;
  box-sizing: border-box;
}

/* Colonne du plateau */
.board-col {
  flex: 1;
  max-width: 800px;
  text-align: center;
}

.status {
  font-weight: bold;
  font-size: 20px;
  margin: 15px 0 30px 0;
}

.player-name {
  font-weight: bold;
  font-size: 18px;
  margin: 15px 0;
}

@media (max-width: 1200px) {
  #board-container {
    min-width: none;
  }
}
@media (max-width: 480px) {
  #board-container {
    transform: scale(0.6);
  }
  .board-col {
    max-height: 60vh;
  }
}
</style>
