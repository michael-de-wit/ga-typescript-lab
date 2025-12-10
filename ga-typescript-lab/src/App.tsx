// import { useState } from 'react'
import './App.css'

function App() {
  
  // const message: string = "Hello World!";
  // const messageLC = message.toLowerCase();
  // Calling 'message'
  // console.log(messageLC)

  // function printName(obj: { first: string; middle?: string; last?: string }): [string,string?,string?] {
    
  //   return [obj.first, obj.middle, obj.last]
  // }

  // const result1 = printName({ first: "Bob" });
  // console.log(result1);
  // const result2 = printName({ first: "Alice", last: "Alisson" });
  // console.log(result2);
  // const result3 = printName({ first: "Johnny", middle: "Cash", last: "Money" });
  // console.log(result3);

  interface Person {
    first:string;
    middle?:string;
    last?:string;
  }

  function printNameV2(person: Person) {
    return person
  }

    const resultV22 = printNameV2({ first: "Johnny", last: "Cash" });
    console.log(resultV22);
    const resultV23 = printNameV2({ first: "Johnny", middle: "Cash", last: "Money" });
    console.log(resultV23);

  return (
    <>
        <h1>Test</h1>
    </>
  )
}

export default App
