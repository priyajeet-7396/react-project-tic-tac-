import { useState } from "react"

const Player = ({initialName,symbol , isActive , onChangeName}) => {
    const [isEditing ,setIsEditing] = useState(false)
    const [Pname,setPname] = useState(initialName)

    function handleEditClick(){
    setIsEditing((isEditing)=>!isEditing)
    if(isEditing){
        onChangeName(symbol , Pname)
    }
    }


  return (
    <li className={isActive ? 'active' : undefined}>
    <span className="player">
    {
        isEditing ?  <input type="text" required value={Pname} onChange={(e)=>setPname(e.target.value)}></input>  : <span className="player-name">{Pname}</span>
    }
    <span className="player-symbol">{symbol}</span>
    </span>
    <button onClick={handleEditClick}>
    {isEditing ? "Save" : "Edit"} 
    </button>
    </li>
  )
}

export default Player