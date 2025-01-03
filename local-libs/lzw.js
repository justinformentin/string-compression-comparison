export class LZW {
  static compress(uncompressed) {
    // Initialize dictionary
    let dictionary = {}
    for (let i = 0; i < 256; i++) {
      dictionary[String.fromCharCode(i)] = i
    }

    let word = ''
    let result = []
    let dictSize = 256

    for (let i = 0, len = uncompressed.length; i < len; i++) {
      let curChar = uncompressed[i]
      let joinedWord = word + curChar

      // Do not use dictionary[joinedWord] because javascript objects
      // will return values for myObject['toString']
      if (dictionary.hasOwnProperty(joinedWord)) {
        word = joinedWord
      } else {
        result.push(dictionary[word])
        // Add wc to the dictionary.
        dictionary[joinedWord] = dictSize++
        word = curChar
      }
    }

    if (word !== '') {
      result.push(dictionary[word])
    }
    return result
  }

  static decompress(compressed) {
    // Initialize Dictionary (inverse of compress)
    let dictionary = {}
    for (let i = 0; i < 256; i++) {
      dictionary[i] = String.fromCharCode(i)
    }

    let word = String.fromCharCode(compressed[0])
    let result = word
    let entry = ''
    let dictSize = 256

    for (let i = 1, len = compressed.length; i < len; i++) {
      let curNumber = compressed[i]

      if (dictionary[curNumber] !== undefined) {
        entry = dictionary[curNumber]
      } else {
        if (curNumber === dictSize) {
          entry = word + word[0]
        } else {
          return null
        }
      }

      result += entry

      // Add word + entry[0] to dictionary
      dictionary[dictSize++] = word + entry[0]

      word = entry
    }

    return result
  }
}
