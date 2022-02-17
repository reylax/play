import { useState } from "react"
import CardHeader from "../share/CardHeader"
import TextInput from "../share/form/TextInput"
import { useMutation } from "@apollo/client"
import { useTheme } from "../../contexts/themeContext"
import { LOGIN, usernameReg, passwordReg, emailReg } from "../signUp/SignUp"

interface props {
  close: Function
  gotoSignUp: Function
}

export default function LogIn({ close, gotoSignUp }: props) {
  const [loginValue, setLoginValue] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const { updateToken } = useTheme()

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: data => {
      if (data.login.status == 201) {
        updateToken(data.login.message)
        close()
      } else {
        setErrorMessage("login error status:" + data.login.status)
      }
    },
    onError: error => {
      console.log(error.message)
      setErrorMessage(error.message)
    }
  })

  return (
    <div className="fixed-center bg-white rounded-md p-1.5"
    style={{
      width: 550,
    }}>
      <CardHeader 
        loading={loading}
        close={true}
        title="Good to see you again!"
        applyText="Login"
        Back={close}
        Apply={() => {
          if (!loginValue || !password) return
          var loginKey = ""
          if (emailReg.test(loginValue)) {
            loginKey = "email"
          } else if (usernameReg.test(loginValue)) {
            loginKey = "username"
          } else {
            setErrorMessage("username or password is not correct!")
          }
          if (passwordReg.test(password)) {
            setErrorMessage("username or password is not correct!")
          }
          login({
            variables: {
              key: loginKey,
              value: loginValue,
              password
            },
          })
        }}
      />
      <div className="text-center">
        <p>{loading && "loading"}</p>
        <p className={errorMessage == "success" ? "text-green-400": "text-red-500"}>{errorMessage}</p>
        <form className="flex flex-col space-y-5 ml-12 mt-5 mr-10 mb-8">
          <TextInput 
            label="Name / Email"
            limit={20}
            text={loginValue}
            setText={setLoginValue}
            type={"text"}
          />
          <TextInput 
            label="Password"
            limit={20}
            text={password}
            setText={setPassword}
            type={"password"}
          />
        </form>
        <p className="text-center mb-8">
          New to pretty ? <span className="text-green-200 cursor-pointer"
                            onClick={() => gotoSignUp()}
                          >Sign Up</span>
      </p>
      </div>
    </div>
  )

}
