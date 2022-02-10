// DOM Elements
const form = document.querySelector('form')! as HTMLFormElement
const selectIn = document.getElementById('devise_in')! as HTMLSelectElement
const selectOut = document.getElementById('devise_out')! as HTMLSelectElement
const exchangResult = document.querySelector('.result')! as HTMLDivElement

// TS & Datas
type DeviseType = {
  name: string;
  code: string;
  symbol: string;
  taux: number;
}

const dollar: DeviseType = {
  name: 'Dollar',
  code: 'DOL',
  symbol: '$',
  taux: 1
}

const euro: DeviseType = {
  name: 'Euro',
  code: 'EUR',
  symbol: '€',
  taux: 1.15
}

const riel: DeviseType = {
  name: 'Riel',
  code: 'RIE',
  symbol: '៛',
  taux: 0.00025 
}

const deviseList: DeviseType[] = [dollar, euro, riel]
let amounts: number
let deviseIn: string
let deviseOut: string

// Logics
const generateOptions = (devises: DeviseType[]): string => {
  let opt: string = ''

  devises.forEach((devise: DeviseType) => {
    opt += `
      <option value="${devise.code}">
        ${devise.name} - ${devise.symbol}
      </option>
    `
  })

  return opt
}

const displayResult = () => {
  const deviseOutSymbol = deviseList.find((ds: DeviseType) => ds.code === deviseOut)

  exchangResult.innerHTML = calculResult(amounts, deviseIn, deviseOut).toFixed(2).toString() + deviseOutSymbol?.symbol
}

const calculResult = (amounts: number, devise_in: string, devise_out: string): number => {
  const deviseIn: unknown = getDevise(devise_in, deviseList)
  const deviseOut: unknown = getDevise(devise_out, deviseList)

  let deviseInital: DeviseType
  if(deviseIn) deviseInital = deviseIn as DeviseType
  else throw {msg: "The initial devise is not correct"}

  let deviseFinal: DeviseType
  if(deviseOut) deviseFinal = deviseOut as DeviseType
  else throw {msg: "The final devise is not correct"}

  return (amounts *  deviseInital.taux) / deviseFinal.taux
}

const getDevise = (deviseCode: string, devises: DeviseType[]): DeviseType | null => {  
  const devise = devises.find((devise: DeviseType) => devise.code === deviseCode)

  return devise ?? null
}

// Events
document.addEventListener('DOMContentLoaded', () => {
  selectIn.innerHTML = generateOptions(deviseList)
  selectOut.innerHTML = generateOptions(deviseList)
  selectIn.querySelectorAll('option')[1].selected = true
  selectOut.querySelectorAll('option')[0].selected = true

  form.addEventListener('keyup', () => {
    amounts = +form.amounts.value
    deviseIn = form.devise_in.value as string
    deviseOut = form.devise_out.value as string

    displayResult()
  })
  
  form.addEventListener('change', () => {
    amounts = +form.amounts.value
    deviseIn = form.devise_in.value as string
    deviseOut = form.devise_out.value as string

    displayResult()
  })
})
