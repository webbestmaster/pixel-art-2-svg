## pixel-art-2-svg

### Install

```
npm i pixel-art-2-svg
```

### How to use

```javascript
const pixelArtToSvg = require('pixel-art-2-svg');
const fileSystem = require('fs');

pixelArtToSvg(__dirname + '/pixel-art.png')
    .then(svgString => {
        fileSystem.writeFile(
            __dirname + '/pixel-art.svg', 
            svgString, 
            'utf-8', 
            () => console.log(__dirname + '/pixel-art.svg - done!')
        );
    });
```
