import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
const birdSize = 30; 
const GAME_HEIGHT = 500;
const GAME_WIDTH = 500;
const GAME_DIFFICULTY_GAP = 120;
const ObsticalWidth = 50;


function App() {
  const [birdPosition,setBirdPosition] = useState(GAME_HEIGHT/2 - birdSize/2);
  const [startGame,setStartGame] = useState(false);
  const [score, setScore] = useState(0);
  const [obstacleHeight,setObsticalHight] = useState(100);
  const [obsticaleLeftPosition,setObsticalsPosition] = useState(GAME_WIDTH-ObsticalWidth);
  

  // Effects for bird Movement 
  useEffect(() => {
    let interval = null;
    if(startGame) {
        interval = setInterval(() => {
            if(obsticaleLeftPosition > - ObsticalWidth) {
              setObsticalsPosition(obstPos => obstPos - 10);
            } else {
              setObsticalsPosition(GAME_WIDTH - 0);
              setObsticalHight(Math.floor(Math.random() * (GAME_HEIGHT - GAME_DIFFICULTY_GAP)));
                setScore(score => score + 1);
            }
        }, 24);
    }
    return () => clearInterval(interval);
},[startGame, obsticaleLeftPosition])

// Effects for the obsticals movment 

useEffect(() => {
  let interval = null;
  if(startGame) {
      interval = setInterval(() => {
          if(birdPosition < GAME_HEIGHT - birdSize) {
              setBirdPosition(birdPosition => birdPosition + 4);
          }
      }, 24);
  }
  return () => clearInterval(interval);
},[startGame, birdPosition])

// Effcets for the Obesticals Collision
useEffect(() => {
  if(startGame) {
      const collidedWithUpperObstacle = birdPosition < obstacleHeight;
      const collidedWithLowerObstacle = birdPosition > obstacleHeight + GAME_DIFFICULTY_GAP;
      if(obsticaleLeftPosition < birdSize && (collidedWithUpperObstacle || collidedWithLowerObstacle)) {
          setStartGame(false);
          // make your fall here
          
      }
  }
},[startGame, obsticaleLeftPosition, birdPosition, obstacleHeight])


// Difine Obstical Height for the game 
const bottomObstical = GAME_HEIGHT - obstacleHeight - GAME_DIFFICULTY_GAP;

  return (
    <>
    <div style={{
      "display" :"flex",
      "justify-content": "center",
      "align-items" : "center",
    'height':"100px",
    "color":"red",
    "fontSize" : "50px"

      }}>
    FLAPPY  BIRD  GAME
    </div>
    
    <div style={{
        'display': 'flex',
        'justify-content': 'center',
       ' align-items': 'center',
    }}>
      <div className="App" >
        <div 
        
        onClick={()=>{
          const newBirdPosition = birdPosition - 50;
          if(newBirdPosition > 0){
            setBirdPosition(birdPosition => birdPosition - 50);
          }else{
           return 0;
          }
        }}
        // this is game box style
        style={{ 
            'height':`${GAME_HEIGHT}px`,
            'width':`${GAME_WIDTH}px`,
            'background-color': 'cyan',
            "border-radius":"20px",
            'overflow': 'hidden',
            'position': 'relative' }}> 


        {/* THE UPPER OBESTICALES FOR THE GAME  */}
        <div style={{
                position: 'absolute',
                top: `${0}px`,
                left: `${obsticaleLeftPosition}px`,
                width: `${ObsticalWidth}px`,
                height: `${obstacleHeight}px`,
                backgroundColor: 'black'
         }} >

         </div>
        
        {/* This is the bottom Obsctials */}
        <div style={{
          "position" :"absolute",
          "top":`${obstacleHeight + GAME_DIFFICULTY_GAP}px`,
          "left":`${obsticaleLeftPosition}px`,
          "width":`${ObsticalWidth}px`,
          "height" :`${bottomObstical}px`,
          "background-color":"black",
        }}>
          
        </div>


           {/* This is bird code  */}
        <div style={{
          'position': 'absolute',
           "height": `${birdSize}px`,
           "width": `${birdSize}px`,
           "border-radius": "50%",
           "background-color": "red",
           "top" :`${birdPosition}px`,
           "left":"9px",
           }}>
           </div>  
        </div>
        <button style={{
          "margin-top":"20px",
          "padding" : "10px",
          "width":"500px",
          "background-color":"red",
          "color":"black",
          "font-size":"20px",
          "font-weight":"500"

        }}
        
        onClick={()=>{setStartGame(true)}}>Start Game</button>
      </div>
      </div>

      
      
    </>
  )
}

export default App;
