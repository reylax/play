import { useState } from "react"
import CardHeader from "../share/CardHeader"
import TextInput from "../share/form/TextInput"
import { useMutation, gql } from "@apollo/client"
import { useTheme } from "../../contexts/themeContext"


const SIGNUP = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      status
      message
    }
  }
`
export const LOGIN = gql`
  mutation ($key: LogInKey!, $value: String!, $password: String! ) {
  login (key: $key, value: $value, password: $password) {
    status
    message
  }
}
`

const RequestEmail = gql`
  mutation ($purpose:String!, $key: String!, $email: String!) {
    requestEmail(purpose: $purpose, key: $key, email: $email) {
      status
      message
    }
  }
`

interface props {
  close: Function
  gotoLogin: Function
}

export default function SignUp({ close, gotoLogin }: props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const { updateToken, setUser} = useTheme()

  const [login] = useMutation(LOGIN, {
    onCompleted: data => {
      if (data.login.status == 201) {
        updateToken(data.login.message)
        setUser({
          username: name,
          email: email
        })
        close()
      } else {
        setErrorMessage("login error status:" + data.login.status)
      }
    },
    onError: error => {
      setErrorMessage(error.message)
    }
  })

  const [signup, { loading }] = useMutation(SIGNUP, {
    variables: {
      username: name,
      email,
      password,
    },
    onCompleted: data => {
      setErrorMessage(data.signUp?.message)
      if (data.signUp.status == 201) {
        login({variables: {
          key: "username",
          value: name,
          password,
        }})
      }
    },
    onError: error => {
      setErrorMessage(error.message)
    }
  });


  return (
    <div className="fixed-center bg-white rounded-md p-1.5 z-20"
      style={{
        width: 550,
      }}
    >
      <CardHeader 
        close={true}
        title="Nice to meet you!"
        applyText="Sign Up"
        Back={close}
        Apply={() => {
          if (passwordConfirm !== password) {
            setErrorMessage("password is not consistent, please check again!")
            setPassword("")
            setPasswordConfirm("")
            return 
          }
          if (staticCertify(name, email, password)) {
            signup()
          }
        }}
        loading={loading}
      />
      <div className="text-center"> 
        <p>{loading && "loading"}</p>
        <p className={errorMessage == "success" ? "text-green-400": "text-red-500"}>{errorMessage}</p>
      </div>
      <form className="flex flex-col space-y-5 ml-12 mt-5 mr-10 mb-8">
        <TextInput 
          label="Name"
          limit={20}
          text={name}
          setText={setName}
          type="text"
        />
        <TextInput 
          label="Email"
          limit={30}
          text={email}
          setText={setEmail}
          type="email"
        />
        <TextInput 
          label="Password"
          limit={50}
          text={password}
          setText={setPassword}
          type="password"
        />
        <TextInput 
          label="Confirm password"
          limit={50}
          text={passwordConfirm}
          setText={setPasswordConfirm}
          type="password"
        />
      </form>
      <p className="text-center mb-8">
        Alread have an account ? <span className="text-green-200 cursor-pointer"
                                  onClick={() => gotoLogin()}
                                 >Log In</span>
      </p>
    </div>
  )
}

export const usernameReg = /^[a-z][a-z0-9]{1,19}$/
export const passwordReg = /^.{6,30}$/
export const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const staticCertify = (name, email, password) => {
  if (usernameReg.test(name) && emailReg.test(email) && passwordReg.test(password))
    return true
  return false
}