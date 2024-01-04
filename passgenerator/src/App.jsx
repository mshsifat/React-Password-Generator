import { useState, useCallback, useEffect, useRef } from 'react'


function App() {




  const [length, setLength] = useState("8");
  const [numberAccess, setNumberAccess] = useState(false);
  const [characterAccess, setCharacterAcces] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useState(null)


  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAccess) str += "0123456789"
    if (characterAccess) str += "!@#$%^&*-_+=[]{}~`"
    
    for (let i = 1; i < length; i++) {

      let characterAccess = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(characterAccess)
      
      
    }

    setPassword(pass)
    

  }, [length, numberAccess, characterAccess, setPassword])


  const copyToClicpBoard = useCallback(() => {

    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {

    passwordGenerator()
  }, [length, numberAccess, characterAccess, setPassword])


  return (
    <>
      <div className='bg-slate-700 py-24 mt-6'>
        <h1 className='text-white text-center text-lg'>Password Generator Fuction</h1>

        <br />



        <div className='flex justify-center'>

          <input
            className='py-4 w-80 rounded-xl outline-none'
            type="text"
            id="password"
            value={password}
            ref={passwordRef}
            readOnly
          />

        
          <button onClick={copyToClicpBoard}
            className='bg-blue-600 text-white py-5 w-14 text-center rounded-xl ml-1'>Copy</button>

        </div>

        <br />

        <div className='text-center'>
     
      <input
            type="range"
            value={length}
            name="volume"
            min="0"
            max="20"
            onChange={(e) => { setLength(e.target.value) }}
        
          />
          
          <input
            className='ml-3'
            type="checkbox"
            checked={numberAccess}
            onChange={() => {
              setNumberAccess((prev) => !prev)
            }}
          
          />
          
          <label className='text-white ml-2'>Length</label>
      
          <input
            className='ml-3'
            type="checkbox"
            checked={characterAccess}
            onChange={() => {
              setCharacterAcces((prev) => !prev)
            }}

          
        />

          <label className='text-white ml-2'>Character</label>

          </div>
        
      </div>
    </>
  )
}

export default App