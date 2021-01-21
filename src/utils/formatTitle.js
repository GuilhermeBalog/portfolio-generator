export const alwaysLowerWords = ['a', 'of', 'de', 'da', 'do', 'dos', 'das', 'the', 'and']

export function formatTitle(text = ""){
  text = breakCamelCaseWords(text)

  const words = splitByUnderlineOrDash(text)

  const capitalizedWords = words.map(word => {
    if(alwaysLowerWords.includes(word)){
      return word
    }

    const firstLetter = word.charAt(0)

    const wordWithoutFirstLetter = word.slice(1)

    const capitalizedWord = firstLetter.toLocaleUpperCase().concat(wordWithoutFirstLetter)

    return capitalizedWord
  })

  return capitalizedWords.join(' ')
}

function breakCamelCaseWords(textInCamelCase){
  return textInCamelCase.replace(/([a-z])([A-Z])/g, '$1 $2')
}

function splitByUnderlineOrDash(text){
  return text.split(/_|-/g)
}
