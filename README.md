# pixel-art-2-svg

### how to use

```javascript
import pixelArtToSvg from 'pixel-art-2-svg';
import fileSystem from 'fs';

pixelArtToSvg(__dirname + '/pixel-art.png')
    .then(data => {
        fileSystem.writeFile(__dirname + '/pixel-art.svg', data, 'utf-8', () => {
            console.log(__dirname + '/pixel-art.svg');
        });
    });
```
