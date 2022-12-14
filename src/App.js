
import './App.css';
import Currencyinput from './components/Currencyinput';
import { useState ,useEffect, useCallback} from 'react';
import axios from 'axios'


function App() {
  const[amount1,setAmount1]= useState(1);
  const[amount2,setAmount2]= useState(1);
  const[currency1,setCurrency1]= useState('USD');
  const[currency2,setCurrency2]= useState('EUR');
   const[rates,setRates]=useState([]);

  useEffect(()=>{
    axios.get('https://api.apilayer.com/fixer/latest?base=USD&apikey=dh1WTqbM4tTjNtrdUOHa6LndmSvS1Kh3').then(response =>{
      setRates(response.data.rates)

    })
},[]);
  
  const handleAmount1Change= useCallback((amount1)=>{
  setAmount2(format(amount1*rates[currency2]/rates[currency1]));
  setAmount1(amount1);
},[rates,currency1,currency2])
  
function handleCurrency1Change(currency1){
  setAmount2(format(amount1*rates[currency2]/rates[currency1]));
  setCurrency1(currency1);
}
useEffect(()=>{
 if(!!rates){
  handleAmount1Change(1);

 }
},[rates, handleAmount1Change])


function format(number){
  return number.toFixed(4);
}


function handleAmount2Change(amount2){
  setAmount1(format(amount2*rates[currency1]/rates[currency2]));
  setAmount2(amount2);
}
function handleCurrency2Change(currency2){
  setAmount1(format(amount2*rates[currency1]/rates[currency2]));
  setCurrency2(currency2);
}
  return (
    <div>
    <h1>Currency Converter</h1>
    <h2>{amount1} {currency1} is equivalent to</h2>
    <h2>{amount2} {currency2}</h2>
    <Currencyinput onAmountChange={handleAmount1Change} onCurrencyChange={handleCurrency1Change} currencies={Object.keys(rates)} amount={amount1} currency={currency1} />
    <Currencyinput  onAmountChange={handleAmount2Change} onCurrencyChange={handleCurrency2Change} currencies={Object.keys(rates)} amount={amount2} currency={currency2}/>
     

    </div>
  );
}

export default App;
