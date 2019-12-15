//TODO плавное появление игроков

const charList = document.querySelector('textarea');
const playerDiv = document.querySelector('.playerDiv');
const playersCount = document.querySelector('.maxPlayersCount');
const teamsCount = document.querySelector('.teamsCount');
const button = document.querySelector('.divideBtn');
const copyBtn = document.querySelector('.copyText');
const teams = document.querySelector('.teams');
const errors = document.querySelectorAll('.errors');
const mainErrors = document.querySelector('.lg-errors')
const listErrors = document.querySelector('.list-errors')
const arrListErrors = document.querySelector('.arrList-errors')
const conditionErrors = document.querySelector('.condition-errors')


//! ОБРАБОТКА ОШИБОК !//

const resetErrors = (errors, DOMList = []) => {
  errors.forEach(error => {
    error.classList.remove('listErrors')
    error.classList.remove('arrListErrors')
    error.classList.remove('conditionErrors')
  })
  DOMList.forEach(item => {
    item.classList.remove('repeated')
  })
}


const errorText = (errors, text) => {
  errors.forEach(error => {
    error.innerHTML = text
  })
}

const localError = (errors, mainErrors, errorName, DOMList = []) => {
  let addingClass
  switch (errorName) {
    case listErrors:
      addingClass = 'listErrors'
      break;
    case arrListErrors:
      addingClass = 'arrListErrors'
      break;
    default:
      addingClass = 'conditionErrors'
      break;
  }
  resetErrors(errors, DOMList)
  mainErrors.classList.add(`${addingClass}`)
  errorName.classList.add(`${addingClass}`)
  const display = window.getComputedStyle(errorName).display
  display == 'none' ? 
    mainErrors.scrollIntoView({block: 'start', behavior: 'smooth'}) :
    errorName.scrollIntoView({block: 'start', behavior: 'smooth'})
}

const checkRepeatedPlayer = (DOMList) => {
  DOMList.forEach((item, index) => {
    for (let i = index + 1; i < DOMList.length; i++) {
      if (!item.innerHTML.localeCompare(DOMList[i].innerHTML, { sensitivity: 'base' })) {
        !item.classList.contains('repeated') ? item.classList.add('repeated') : null
        !DOMList[i].classList.contains('repeated') ? DOMList[i].classList.add('repeated') : null
      }
    }
  })

  for (let i = 0; i < DOMList.length; i++) {
    if (DOMList[i].classList.contains('repeated')) {
      return false
    }
  }

  return true
}

const checkErrors = (arrList, numTeams, numPlayers, DOMList = []) => {
  if (numTeams <= 0 || !parseInt(numTeams)) {
    errorText(errors, 'Введите количество команд')
    localError(errors, mainErrors, conditionErrors)
    return false
  } else if (numPlayers <= 0 || !parseInt(numPlayers)) {
    errorText(errors, 'Введите количество игроков')
    localError(errors, mainErrors, conditionErrors)
    return false
  } else if (!arrList || !arrList[0]) {
    errorText(errors, 'Недостаточно игроков')
    localError(errors, mainErrors, listErrors)
    return false
  } else if (numTeams > arrList.length) {
    errorText(errors, 'Недостаточно игроков')
    localError(errors, mainErrors, listErrors)
    return false
  } else if (!checkRepeatedPlayer(DOMList)) {
    errorText(errors, 'Повторяющиеся игроки')
    localError(errors, mainErrors, arrListErrors)
    return false
  } return true  
}

//! ПРОВЕРКА НА ПУСТЫЕ СТРОКИ ВВОДА !//

const emptyLineCheck = (array) => {
  for (let i = (array.length - 1); i >= 0; i--) {
    if (!array[i]) {
      array.splice(i, 1)
    }
  }
}

//! КОНВЕРТАЦИЯ ВВЕДЕННЫХ ДАННЫХ В DOM !//

const charToArr = (charList) => {
  if (charList) {
    let arrList = charList.split('\n');
    emptyLineCheck(arrList)
    arrList = arrList.map(item => {
      return item = item[0].toUpperCase() + item.slice(1)
    })
    return arrList;
  } else return;
}

const drawListDom = (arrList, div, numPlayers, numTeams) => {
  div.innerHTML = '';
  if (arrList) {
    arrList.forEach(player => {
      let newPlayer = document.createElement('p')
      newPlayer.className = 'player'
      newPlayer.innerHTML = player
      div.append(newPlayer)
    })
    errorText(errors, 'Выберите несеянных участников')
    localError(errors, mainErrors, arrListErrors)
    let playersDom = document.querySelectorAll('.player')
    checkSubstitutions(arrList, playersDom, numPlayers, numTeams)
    return playersDom
  } else {
    errorText(errors, 'Введите список участников.\nКаждый участник с новой строки')
    localError(errors, mainErrors, listErrors)
  }
}

//! ПРОВЕРКА НА ЛИШНИХ УЧАСТНИКОВ !//

const checkSubstitutions = (list, domList, numPlayers, numTeams) => {
  const subs = list.length - numPlayers * numTeams;
  if (subs > 0) {
    for (let i = 1; i <= subs; i++) {
      domList[list.length - i].classList.add('subsPlayer')
      list[list.length - i] = ''
    }
    emptyLineCheck(list)
  }
}

//! ДОБАВЛЕНИЕ СЕЯНЫХ/НЕСЕЯНЫХ УЧАСТНИКОВ !//

const signBasket4 = (elem) => {
  if (elem.classList.contains('player') 
    && !elem.classList.contains('subsPlayer')) { //* не отмечаем замены
    elem.classList.contains('leage4Player') ? 
      elem.classList.remove('leage4Player') :
      elem.classList.add('leage4Player');
  }
}

const addToBasket4 = (list, domList) => {
  let newList = [];
  domList.forEach((domPlayer, i) => {
    if (domPlayer.classList.contains('leage4Player')) {
      newList = [...newList, list[i]]; 
      list[i] = ''
    }
  })
  emptyLineCheck(list)
  return newList;
}

//! ПЕРЕМЕШИВАНИЕ СПИСКА !//

const shuffle = (list) => {
  if (list) {
    let j, temp;
    for(var i = list.length - 1; i > 0; i--){
      j = Math.floor(Math.random()*(i + 1));
      temp = list[j];
      list[j] = list[i];
      list[i] = temp;
    }
    return list;
  } else {
    console.log('Отсутствует список');
    return
  }
}

//! ДЕЛЕНИЕ НА ГРУППЫ !//


const divideTeams = (mainList, numTeams, basket4 = []) => {
  const teams = []
  mainList = [...mainList, ...basket4];
  for (let i = 0; i < numTeams; i++) {
    teams[i] = [];
  }
  mainList.forEach((player, i) => {
    const index = (numTeams + i) % numTeams; 
    teams[index] = [...teams[index], player];
  })
  return teams;
}

//! ОТОБРАЖЕНИЕ ГРУПП !//

const slowView = (teams) => {

}

const drawNewTeams = (newTeamsList, teamsDiv) => {
  const subs = document.querySelectorAll('.subsPlayer')
  if (newTeamsList) {
    teamsDiv.innerHTML = ''
    newTeamsList.forEach((team, i) => {
      let newTeam = document.createElement('div')
      newTeam.className = 'newTeam'
      teamsDiv.append(newTeam)
      let teamName = document.createElement('h3')
      teamName.className = 'teamName'
      teamName.innerHTML = `Команда ${i+1}:`
      newTeam.append(teamName)
      team.forEach((player, i) => {
        let nextPlayer = document.createElement('p')
        nextPlayer.className = 'newPlayer'
        nextPlayer.innerHTML = player
        newTeam.append(nextPlayer)
      })
    })
    copyBtn.classList.add('showBtn')
    if (subs.length) {
      let newTeam = document.createElement('div')
      newTeam.className = 'newTeam'
      teamsDiv.append(newTeam)
      let teamName = document.createElement('h3')
      teamName.className = 'teamName'
      teamName.innerHTML = `Запасные:`
      newTeam.append(teamName)
      subs.forEach((player, i) => {
        let nextPlayer = document.createElement('p')
        nextPlayer.className = 'newPlayer'
        nextPlayer.innerHTML = player.innerHTML
        newTeam.append(nextPlayer)
      })
    }
  }
}

//! НАЖАТИЕ НА КНОПКУ !//

const btnInit = (mainList, teamsInput, playersInput, domList) => {
  const numTeams = teamsInput.value;
  const numPlayers = playersInput.value;
  if (!checkErrors(mainList, numTeams, numPlayers, domList)) {
    return
  } else {
    let basketOneList = [...mainList]
    let basketFourList = addToBasket4(basketOneList, domList)
    basketOneList = shuffle(basketOneList)
    basketFourList = shuffle(basketFourList)
    const newTeams = divideTeams(basketOneList, numTeams, basketFourList);
    drawNewTeams(newTeams, teams)
    teams.scrollIntoView({block: "start", behavior: "smooth"})
  }
}

//* ------------------------- *//

document.addEventListener('DOMContentLoaded', () => {
  let playersDomList = [];
  let playerList =[];

  //* Работа с полем ввода. Подсказки и отрисовка DOM *//
  charList.addEventListener('focus', e => {
    e.preventDefault()
    errorText(errors, 'Введите список участников.\nКаждый участник с новой строки')
    localError(errors, mainErrors, listErrors, playersDomList)
  })
  charList.addEventListener('input', (e) => {
    e.preventDefault()
    playerList =  charToArr(charList.value)
    playersDomList = drawListDom(playerList, playerDiv, playersCount.value, teamsCount.value)
  })

  //* Отрисовка DOM в зависимости от количества участников/групп *//
  playersCount.addEventListener('input', e => {
    if (playersCount.value) {
      playerList =  charToArr(charList.value)
      playersDomList = drawListDom(playerList, playerDiv, playersCount.value, teamsCount.value)
    }
  })
  teamsCount.addEventListener('input', e => {
    if (teamsCount.value) {
      playerList =  charToArr(charList.value)
      playersDomList = drawListDom(playerList, playerDiv, playersCount.value, teamsCount.value)
    }
  })

  //* Добавление/удаление сеяных/несеяных участников *//
  playerDiv.addEventListener('click', (e) => {
    e.preventDefault()
    signBasket4(e.target)
  })

  //* Работа с кнопкой деления *//
  button.addEventListener('click', (e) => {
    e.preventDefault()
    btnInit(playerList ,teamsCount, playersCount, playersDomList)
  })

  //* Работа с кнопкой копирования групп *//
  copyBtn.addEventListener('click', (e) => {
    e.preventDefault()
    copyForWhatsapp(teams) ? copied(copyBtn) : null //* copyText.js
    
  })

})

