import React, { useEffect } from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { CanvasHandler } from './CanvasHandler';
import './App.css';



const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedImage: "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png",
      adContent: "Heading goes here",
      xAxis: 50,
      yAxis: 50,
      maxCharPerLine: 31,
      contentFontSize: 44,
      cta: "",
      xAxisCTA: 50,
      yAxisCTA: 50,
      contentFontSizeCTA: 30,
      templateColor: "#ff0000",
    };
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const canvasHandler = new CanvasHandler('canvas');
    canvasHandler.ctx.clearRect(0, 0, 1080, 1080);
   
    canvasHandler.drawImage('https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png', 0, 0, 1080, 1080);

   
    canvasHandler.drawImage(this.state.uploadedImage, 56, 442, 970, 600);

    
    const captionOptions = {
      font: 'Arial',
      fontSize: this.state.contentFontSize,
      color: '#FFFFFF',
      alignment: 'left',
      maxCharactersPerLine: 31,
    };
    canvasHandler.drawText(this.state.adContent, this.state.xAxis, this.state.yAxis, captionOptions);

    // Draw CTA
    const ctaOptions = {
      textColor: '#000000',
      bgColor: '#FFFFFF',
      fontSize: this.state.contentFontSizeCTA,
      wrapLength: 20,
    };
    canvasHandler.drawCTA(this.state.cta, this.state.xAxisCTA, this.state.yAxisCTA, ctaOptions);
  }

  handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    this.setState({ uploadedImage: imageUrl });
  };

  handleAdContentChange = (event) => {
    this.setState({ adContent: event.target.value });
  };

  handleCTAChange = (event) => {
    this.setState({ cta: event.target.value });
  };

  handleCanvasColorChange = (event) => {
    this.setState({ templateColor: event.target.value });
  };

  render() {
    return (
      <div className='App'>
        <canvas
          height={1080}
          width={1080}
          id="canvas"
          style={{ backgroundColor: this.state.templateColor }}
        />
        <div className='Customize'>
          <h1>Ad Customization</h1>
          <p>Customize your ad and get the templates accordingly</p>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            onChange={this.handleImageUpload}
            sx={{ margin: 2 }}
          >
            Upload Image
            <VisuallyHiddenInput type="file" />
          </Button>
          <TextField label={'Ad Content'} id="content" className='input-box' sx={{ margin: 1 }} onChange={this.handleAdContentChange} value={this.state.adContent}/>
          <FormControl id="content-form">
            <Typography className='slide' sx={{ margin: 1 }}>
              X
            </Typography>
            <Slider
              aria-label="X"
              defaultValue={50}
              max={900}
              color="primary"
              onChange={(event) => this.setState( { xAxis : event.target.value })}
              sx={{ margin: 1 }}
            />
            <Typography className='slide' sx={{ margin: 1 }}>
              Y
            </Typography>
            <Slider
              aria-label="Y"
              defaultValue={50}
              min={25}
              max={675}
              color="primary"
              sx={{ margin: 1 }}
              onChange={(event) => this.setState( { yAxis : event.target.value })}
            />
            <Typography className='slide' sx={{ margin: 1 }}>
              Size
            </Typography>
            <Slider
              aria-label="Font"
              defaultValue={40}
              min={25}
              max={60}
              color="primary"
              onChange={(event) => this.setState( { contentFontSize : event.target.value })}
              sx={{ margin: 1 }}
            />
          </FormControl>
          <TextField label={'CTA'} id="cta" sx={{ margin: 1 }} onChange={this.handleCTAChange} />
          <FormControl id="content-form">
            <Typography className='slide' sx={{ margin: 1 }}>
              X
            </Typography>
            <Slider
              aria-label="XCTA"
              defaultValue={50}
              max={900}
              sx={{ margin: 1 }}
              color="primary"
              onChange={(event) => this.setState( { xAxisCTA : event.target.value })}
            />
            <Typography className='slide' sx={{ margin: 1 }}>
              Y
            </Typography>
            <Slider
              aria-label="YCTA"
              defaultValue={50}
              min={25}
              max={675}
              sx={{ margin: 1 }}
              color="primary"
              onChange={(event) => this.setState( { yAxisCTA : event.target.value })}
            />
            <Typography className='slide'>
              Size
            </Typography>
            <Slider
              aria-label="FontCTA"
              defaultValue={40}
              min={25}
              max={60}
              color="primary"
              onChange={(event) => this.setState( { contentFontSizeCTA : event.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Template Colour</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={this.handleCanvasColorChange}
            >
              <FormControlLabel value="#00FF00" control={<Radio style={{ color: "#00FF00" }} />} label="green" />
              <FormControlLabel value="#0000FF" control={<Radio style={{ color: "#0000FF" }} />} label="blue" />
              <FormControlLabel value="#FF0000" control={<Radio style={{ color: "#FF0000" }} />} label="red" />
              <FormControlLabel value="#FFFF00" control={<Radio style={{ color: "#FFFF00" }} />} label="yellow" />
              <FormControlLabel value="#FF00FF" control={<Radio style={{ color: "#FF00FF" }} />} label="magenta" />

            </RadioGroup>
          </FormControl>
        </div>
      </div>
    );
  }
}

export default App;