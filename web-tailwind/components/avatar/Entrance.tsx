import SignUp from "../signUp/SignUp";
import LogIn from "../logIn/LogIn";
import { useState } from "react";
import  LockScreen  from "../containers/LockScreen"

export default function Entrance() {

  const [showSignUpCard, setShowSignUpCard] = useState(false)
  const [showLoginCard, setShowLoginCard] = useState(false)

  return (
    <div>
      <div className="flex space-x-1 w-full">
        <button className="bg-green-400 hover:bg-green-500 px-2.5 py-1 rounded-sm flex-1 font-semibold text-lg text-black whitespace-nowrap"
          onClick={() => setShowLoginCard(true)}
        >
          Log In
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 px-2.5 py-1 rounded-sm flex-1 font-semibold text-lg text-white whitespace-nowrap"
          onClick={() => setShowSignUpCard(true)}
        >
          Sign Up
        </button>
      </div>
      {showSignUpCard && 
        <LockScreen>
          <SignUp 
            close={() => setShowSignUpCard(false)}
            gotoLogin={() => {
              setShowSignUpCard(false)
              setShowLoginCard(true)
            }}
          />
      </LockScreen>}
      {
        showLoginCard && 
        <LockScreen>
          <LogIn 
            close={() => setShowLoginCard(false)}
            gotoSignUp={() => {
              setShowLoginCard(false)
              setShowSignUpCard(true)
            }}
          />
        </LockScreen>
      }
    </div>
  )
}