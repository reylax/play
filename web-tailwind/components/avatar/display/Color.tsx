import ColorOption from "./ColorOption";
import { Fire, Avocado, Octopus, CherryBlossom, MediumStart, BlueHeart } from '../../../public/svgs'


export default function Color() {
  return (
    <div className="flex justify-between">
      { colors.map(({name, color, Icon}, index) => 
          <ColorOption
            key={index}
            name={name}
            color={color}
            Icon={Icon}
          />)}
    </div>
  )
}

const colors = [
  {
    name: "blueHeart",
    color: "#03a9f4",
    Icon: BlueHeart,
  },
  {
    name: "mediumStart",
    color: "#fdd835",
    Icon: MediumStart,
  },
  {
    name: "cherryBlossom",
    color: "#e91e63",
    Icon: CherryBlossom,
  },
  {
    name: "octopus",
    color: "#9c27b0",
    Icon: Octopus,
  },
  {
    name: "fire",
    color: "#ff5722",
    Icon: Avocado,
  },
  {
    name: "avocado",
    color: "#4caf50",
    Icon: Fire,
  },
]