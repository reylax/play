import React, { ComponentType } from "react";
import { useTheme } from "../../contexts/themeContext";

interface prop {
    Icon: ComponentType
    FcousIcon: ComponentType
    text: string
    focused: boolean
    index: number
    onPress: Function
}

export default function NavItem({ Icon, FcousIcon, text, focused, index, onPress }:prop) {

    const color = focused ? "text-primary-500" : "text-c-body"
    const { Lang } = useTheme()

    return (
      <button className="group flex items-center pl-2 pr-2 py-2 rounded-3xl hover:bg-primary-50"
        onClick={ () => onPress(index) }
      >
          <div className={`${color} first:w-6 mr-3 first:fill-current group-hover:text-primary-500`}> 
            { focused ? <FcousIcon /> : <Icon /> }
          </div>
          <p className={`${color} font-display text-xl font-semibold group-hover:text-primary-500`}>{ Lang.navBar[text] }</p>
      </button>
    )
}

