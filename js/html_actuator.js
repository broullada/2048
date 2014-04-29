function HTMLActuator() {
  this.tileContainer    = document.querySelector(".tile-container");
  this.scoreContainer   = document.querySelector(".score-container");
  this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");

  this.score = 0;
  this.snd = new Audio('./sound-sets/lucasarts/silence.mp3');
}

HTMLActuator.prototype.actuate = function (grid, metadata) {
  var self = this;

  window.requestAnimationFrame(function () {
    self.clearContainer(self.tileContainer);

    grid.cells.forEach(function (column) {
      column.forEach(function (cell) {
        if (cell) {
          self.addTile(cell);
        }
      });
    });

    self.updateScore(metadata.score);
    self.updateBestScore(metadata.bestScore);

    if (metadata.terminated) {
      if (metadata.over) {
        self.message(false); // You lose
      } else if (metadata.won) {
        self.message(true); // You win!
      }
    }

  });
};

// Continues the game (both restart and keep playing)
HTMLActuator.prototype.continueGame = function () {
  this.clearMessage();
};

HTMLActuator.prototype.clearContainer = function (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

HTMLActuator.prototype.addTile = function (tile) {
  var self = this;

  var wrapper   = document.createElement("div");
  var inner     = document.createElement("div");
  var position  = tile.previousPosition || { x: tile.x, y: tile.y };
  var positionClass = this.positionClass(position);

  // We can't use classlist because it somehow glitches when replacing classes
  var classes = ["tile", "tile-" + tile.value, positionClass];

  if (tile.value > 2048) classes.push("tile-super");

  this.applyClasses(wrapper, classes);

  inner.classList.add("tile-inner");
  inner.textContent = tile.value;

  if (tile.previousPosition) {
    // Make sure that the tile gets rendered in the previous position first
    window.requestAnimationFrame(function () {
      classes[2] = self.positionClass({ x: tile.x, y: tile.y });
      self.applyClasses(wrapper, classes); // Update the position
    });
  } else if (tile.mergedFrom) {
    classes.push("tile-merged");
    this.applyClasses(wrapper, classes);

    // Render the tiles that merged
    tile.mergedFrom.forEach(function (merged) {
      self.addTile(merged);
    });
  } else {
    classes.push("tile-new");
    this.applyClasses(wrapper, classes);
  }

  // Add the inner part of the tile to the wrapper
  wrapper.appendChild(inner);

  // Put the tile on the board
  this.tileContainer.appendChild(wrapper);
};

HTMLActuator.prototype.applyClasses = function (element, classes) {
  element.setAttribute("class", classes.join(" "));
};

HTMLActuator.prototype.normalizePosition = function (position) {
  return { x: position.x + 1, y: position.y + 1 };
};

HTMLActuator.prototype.positionClass = function (position) {
  position = this.normalizePosition(position);
  return "tile-position-" + position.x + "-" + position.y;
};

HTMLActuator.prototype.updateScore = function (score) {
  this.clearContainer(this.scoreContainer);

  var difference = score - this.score;
  this.score = score;

  this.scoreContainer.textContent = this.score;
  this.snd.pause();
  if (difference > 0) {
    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = "+" + difference;

    this.scoreContainer.appendChild(addition);

   if (difference < 8) {
      this.snd = new Audio('./sound-sets/lucasarts/tonoLOOM.mp3');  
      
    }
    if (difference >= 8) {
      this.snd = new Audio('./sound-sets/lucasarts/tonoMI.mp3');  
      
    }
    if (difference >= 16) {
      this.snd = new Audio('./sound-sets/lucasarts/tonoMI2.mp3');  
      
    }
    if (difference >= 32) {
      this.snd = new Audio('./sound-sets/lucasarts/tonoIJ4.mp3');  
      
    }
    if (difference >= 64) {
       var a =  Math.floor((Math.random() * 4) + 1);
        if (a == 1) {
          this.snd = new Audio('./sound-sets/lucasarts/tonoDOTT.mp3');   
        }
        if (a == 2) {
            this.snd = new Audio('./sound-sets/lucasarts/thirstyDOTT.mp3');         
        }
        if (a == 3) {
            this.snd = new Audio('./sound-sets/lucasarts/BTTMDOTT.mp3');
        }  
        if (a == 4) {
            this.snd = new Audio('./sound-sets/lucasarts/TOTWDOTT.mp3'); 
        }   
      
    }
  if (difference >= 128) {
       var a =  Math.floor((Math.random() * 2) + 1);
        if (a == 1) {
          this.snd = new Audio('./sound-sets/lucasarts/tonoSM.mp3');   
        }
        if (a == 2) {
            this.snd = new Audio('./sound-sets/lucasarts/CIKHHSM.mp3');         
        }
    }
    if (difference >= 256) {
       var a =  Math.floor((Math.random() * 2) + 1);
        if (a == 1) {
          this.snd = new Audio('./sound-sets/lucasarts/tonoFT.mp3');   
        }
        if (a == 2) {
            this.snd = new Audio('./sound-sets/lucasarts/WISAFT.mp3');         
        }
    }
     if (difference >= 512) {
       var a =  Math.floor((Math.random() * 3) + 1);
        if (a == 1) {
          this.snd = new Audio('./sound-sets/lucasarts/tonoTD.mp3');   
        }
        if (a == 2) {
            this.snd = new Audio('./sound-sets/lucasarts/UERHTD.mp3');         
        }
        if (a == 3) {
            this.snd = new Audio('./sound-sets/lucasarts/TUVATD.mp3');         
        }
    }
    if (difference >= 1024) {
       var a =  Math.floor((Math.random() * 6) + 1);
        if (a == 1) {
          this.snd = new Audio('./sound-sets/lucasarts/tonoMI3.mp3');   
        }
        if (a == 2) {
            this.snd = new Audio('./sound-sets/lucasarts/ton2MI3.mp3');         
        }
        if (a == 3) {
            this.snd = new Audio('./sound-sets/lucasarts/PMSCMI3.mp3');         
        }
        if (a == 4) {
          this.snd = new Audio('./sound-sets/lucasarts/PQABMI3.mp3');   
        }
        if (a == 5) {
            this.snd = new Audio('./sound-sets/lucasarts/DDCGTMI3.mp3');         
        }
        if (a == 6) {
            this.snd = new Audio('./sound-sets/lucasarts/PZDBPMMI3..mp3');         
        }
    }
     if (difference >= 2048) {
       var a =  Math.floor((Math.random() * 5) + 1);
        if (a == 1) {
          this.snd = new Audio('./sound-sets/lucasarts/tono3GF.mp3');   
        }
        if (a == 2) {
            this.snd = new Audio('./sound-sets/lucasarts/tono2GF.mp3');         
        }
        if (a == 3) {
            this.snd = new Audio('./sound-sets/lucasarts/tonoGF.mp3');         
        }
        if (a == 4) {
          this.snd = new Audio('./sound-sets/lucasarts/UBEEMN9GF.mp3');   
        }
        if (a == 5) {
            this.snd = new Audio('./sound-sets/lucasarts/MLMCGF.mp3');         
        }
    }
  }
  else {
    this.snd = new Audio('./sound-sets/lucasarts/toneMM.mp3');
  }
 
  this.snd.play();
};

HTMLActuator.prototype.updateBestScore = function (bestScore) {
  this.bestContainer.textContent = bestScore;
};

HTMLActuator.prototype.message = function (won) {
  var type    = won ? "game-won" : "game-over";
  var message = won ? "Kisses from Murray!" : "Murray hates you!";

  this.messageContainer.classList.add(type);
  this.messageContainer.getElementsByTagName("p")[0].textContent = message;
  
};

HTMLActuator.prototype.clearMessage = function () {
  // IE only takes one value to remove at a time.
  this.messageContainer.classList.remove("game-won");
  this.messageContainer.classList.remove("game-over");
};
