import React from 'react';
import "./MyDM.scss";

// pad content
const drum = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Hi Hat open/close',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  }, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Hi Hat closed',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  }, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Tom',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  }, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Bass',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  }];

  const piano = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater 1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  }, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater 2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  }, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Chord 1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  }, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Chord 2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  }, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Chord 3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  }];
  // pads state
  const activeSt={
    backgroundColor:"red",
    boxShadow:"0 0px black",
    marginTop:13,
    height: 77
  };

  const inactiveSt={
    backgroundColor: "blue",
    boxShadow:"3px 3px black",
    marginTop: 10
  };
// declare drumpads
  class Drum extends React.Component{
      constructor(props){
          super(props);
          this.state={
            padState: inactiveSt
          }
          //bindings
          this.playSound = this.playSound.bind(this);
          this.swapPadState = this.swapPadState.bind(this);
          this.keyPress = this.keyPress.bind(this);
      }
      // listerners
      componentDidMount(){
        document.addEventListener('keydown',this.keyPress);
      }
      componentWillUnmount(){
        document.removeEventListener('keydown',this.keyPress);
      }
      // methods
      playSound(e){
        const play = document.getElementById(this.props.keyTrigger);
        play.currentTime = 0;
        play.play();
        this.swapPadState();
        setTimeout(()=>this.swapPadState(),100);
        this.props.updDispl(this.props.padID.replace(/-/g,""));
      }
      swapPadState(){
        if(this.props.onoff){
            this.state.padState.backgroundColor === "red"?
            this.setState({
                padState: inactiveSt
            }):
            this.setState({
                padState: activeSt
            });
        } else{
            this.state.padState.margin === 13 ?
            this.setState({
                padState:inactiveSt
            }):
            this.setState({
                padState: {
                    backgroundColor: "blue",
                    boxShadow:"3px 3px black",
                    marginTop: 10,
                    height: 80
                }
            });
        }
      }
      keyPress(e){
        if(e.keyCode===this.props.keyCode){
            this.playSound();
        }
        else{

        }
      };
      // render 
      render(){
          return(
              <div id={this.props.padID}
              onClick={this.playSound}
              className="drum-pad" 
              style={this.state.padState}>
                <audio className='sound' id={this.props.keyTrigger} src={this.props.sound}></audio>
                {this.props.keyTrigger}
              </div>
          )
      }
  }
// pad box
  class DrumBox extends React.Component{
      constructor (props){
          super(props)
      }
      // render
      render(){
        let drumBox;
        this.props.onoff?
            drumBox = this.props.currentDrumBox.map((drumObj, i, drumBoxArr)=>{
              return(
                <Drum
                padID={drumBoxArr[i].id} 
	  					  sound={drumBoxArr[i].url}
		  	  			keyTrigger={drumBoxArr[i].keyTrigger}
			  	  		keyCode={drumBoxArr[i].keyCode} 
				  	  	updDispl={this.props.updDispl} 
					  	  onoff={this.props.onoff}/>
              )
            }):
            drumBox = this.props.currentDrumBox.map((drumObj, i, drumBoxArr)=>{
              return(
                <Drum
                padID={drumBoxArr[i].id} 
	  					  sound="#"
		  	  			keyTrigger={drumBoxArr[i].keyTrigger}
			  	  		keyCode={drumBoxArr[i].keyCode} 
				  	  	updDispl={this.props.updDispl} 
					  	  onoff={this.props.onoff}/>
              )
            });
            return(
              <div className="pad-bank" >
                {drumBox}
              </div>
            )
      }
  }
// main app
class MyDrumApp extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      onoff: true,
      displayValue:String.fromCharCode(160),
      currentDrumBox: drum,
      currentDrumBoxID: "Drum Kit",
      volSlidVal: 0.2
    }
    // binding
    this.displayName = this.displayName.bind(this);
    this.onoffCon = this.onoffCon.bind(this);
    this.volValue = this.volValue.bind(this);
    this.selBox = this.selBox.bind(this);
    this.clearDispl = this.clearDispl.bind(this);
  }
  // methods
  displayName(name){
    if(this.state.onoff){
      this.setState({
        displayValue: name 
      });
    }
  }
  onoffCon(){
    this.setState({
      onoff:!this.state.onoff,
      displayValue:String.fromCharCode(160)
    })
  }
  volValue(e){
    if(this.state.onoff){
      this.setState({
        volSlidVal: e.target.value,
        displayValue: "Volume: " + Math.round(e.target.value * 100)
      });
      setTimeout(() => this.clearDispl(), 1500);
    }
  }
  selBox(){
    if(this.state.onoff){
      this.state.currentDrumBoxID === "Drum Kit"?
        this.setState({
          currentDrumBox: piano,
          displayValue: "Piano Kit",
          currentDrumBoxID: "Piano Kit"
        }):
        this.setState({
          currentDrumBox: drum,
          displayValue: "Drum Kit",
          currentDrumBoxID: "Drum Kit"
        })
    }
  }
  clearDispl(){
    this.setState({
      displayValue:String.fromCharCode(160)
    })
  }
  // render
  render(){
    const powerSlider = this.state.onoff ? {
      float: 'right'
    } : {
      float: 'left'
    };
    const bankSlider = this.state.currentDrumBox === drum ? {
      float: 'right'
    } : {
      float: 'left'
    }; 
    {
      const sounds = [].slice.call(document.getElementsByClassName('sound'));
      sounds.forEach(sound => {
        sound.volume = this.state.volSlidVal
      });
    }
    return(
      <div id="drum-machine" className="inner-container">
        <DrumBox 
        onoff={this.state.onoff}
        updDispl={this.displayName}
        soundVol={this.state.volSlidVal}
        currentDrumBox={this.state.currentDrumBox}
        />
        <div className="logo">
          <div className="inner-logo ">
            {'Made by: MS'}
          </div>
        </div>
      
        <div className="controls-container">
				  <div className="control">
				    <p>On/Off</p>
					  <div onClick={this.onoffCon} className="select">
					  	<div style={powerSlider} className="inner" />
					  </div>
				  </div>
				  <p id="display">
				  	{this.state.displayValue}
				  </p>
				  <div className="volume-slider">
					  <input type="range" min="0" max="1" step="0.01" value={this.state.volSlidVal} onChange={this.volValue} />
				  </div>
				  <div className="control">
					  <p>Change kit:</p>
					  <div onClick={this.selBox} className="select">
					  	<div style={bankSlider} className="inner" />
					  </div>
				  </div>
        </div>
      </div>
    )
  }
}

export default MyDrumApp;