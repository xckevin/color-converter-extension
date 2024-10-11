import { useState } from 'react';
import './App.css';
import { colorConverter } from './color';
import { Button, ColorPicker, Flex, Input, message } from 'antd';
import { CopyOutlined, BgColorsOutlined } from '@ant-design/icons';


function App() {
  const [hex, setHex] = useState('');
  const [rgb, setRgb] = useState('');
  const [hsl, setHsl] = useState('');

  const colorChanged4Rgb = (rgbColorString: string) => {
    setRgb(rgbColorString);
    setHex(colorConverter.rgbToHex(rgbColorString));
    setHsl(colorConverter.rgbToHslString(rgbColorString));
  };
  const colorChanged4Rgba = (rgbaColorString: string) => {
    setRgb(rgbaColorString);
    setHex(colorConverter.rgbaToHexaString(rgbaColorString));
    setHsl(colorConverter.rgbaToHslaString(rgbaColorString));
  };

  const [messageApi, contextHolder] = message.useMessage();

  const copyToClipboard = (text: string) => {
    if (text.length === 0) {
      return;
    }
    if (!navigator.clipboard) {
      messageApi.error('Your browser does not support clipboard API');
      return;
    }
    navigator.clipboard.writeText(text)
      .then(() => {
        messageApi.success('Copied!');
      }, (err) => {
        messageApi.warning('Copy failed');
      });

  };


  return (
    <>
      <header>
        <p style={{ fontSize: '1.5rem', textAlign: 'center', fontWeight: 'medium' }}>Color Converter</p>
        <p>This tool helps you convert colors between different color formats.</p>
      </header>
      <main>

        <div>
          <p style={{ fontSize: '1.2rem', textAlign: 'left' }}>Enter a color:</p>
        </div>
        <Input
          suffix={
            <ColorPicker
              defaultValue={"#ff6600"}
              styles={{ popupOverlayInner: { position: 'absolute', left: '50%', transform: 'translate(-100%, -50%)' } }}
              onChangeComplete={(color) => {
                const str = (color.toRgbString())
                if (colorConverter.rgbColorRegex.test(str)) {
                  colorChanged4Rgb(str)
                } else if (colorConverter.rgbaColorRegex.test(str)) {
                  colorChanged4Rgba(str)
                }
              }} />
          }
          placeholder="#ff6600"
          autoFocus={true}
          onChange={(e) => {
            const str = (e.target.value)
            if (colorConverter.rgbColorRegex.test(str)) {
              colorChanged4Rgb(str)
            } else if (colorConverter.rgbaColorRegex.test(str)) {
              colorChanged4Rgba(str)
            } else if (colorConverter.hexColorRegex.test(str)) {
              colorChanged4Rgb(colorConverter.hexToRgbString(str))
            } else if (colorConverter.hexaColorRegex.test(str)) {
              colorChanged4Rgba(colorConverter.hexaToRgbaString(str))
            } else if (colorConverter.hslColorRegex.test(str)) {
              colorChanged4Rgb(colorConverter.hslToRgbString(str))
            } else if (colorConverter.hslaColorRegex.test(str)) {
              colorChanged4Rgba(colorConverter.hslaToRgbaString(str))
            } else {
              // messageApi.error('Invalid color format')
            }
          }} />

        <div>
          <p style={{ fontSize: '1.2rem', textAlign: 'left' }}>Results</p>
        </div>
        {contextHolder}
        <Input addonBefore="RGB" value={rgb} suffix={<CopyOutlined onClick={() => { copyToClipboard(rgb) }} />} readOnly={true} defaultValue="" />
        <Input addonBefore="HEX" value={hex} suffix={<CopyOutlined onClick={() => { copyToClipboard(hex) }} />} readOnly={true} defaultValue="" style={{ marginTop: '8px' }} />
        <Input addonBefore="HSL" value={hsl} suffix={<CopyOutlined onClick={() => { copyToClipboard(hsl) }} />} readOnly={true} defaultValue="" style={{ marginTop: '8px' }} />
      </main>
    </>
  );
}

export default App;
