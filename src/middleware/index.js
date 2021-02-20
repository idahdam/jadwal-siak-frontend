var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
parts = [],
img = new Image();

img.onload = split_4;

const split_4 = () => {
    var w2 = img.width / 2,
    h2 = img.height / 2;

    for(var i=0; i<4; i++) {
    var x = (-w2*i) % (w2*2),
        y = (h2*i)<=h2? 0 : -h2 ;

    canvas.width = w2;
    canvas.height = h2;

    ctx.drawImage(this, x, y, w2*2, h2*2);

    parts.push( canvas.toDataURL() );

    // for test div
    var slicedImage = document.createElement('img')
    slicedImage.src = parts[i];
    var div = document.getElementById('test');
    div.appendChild( slicedImage );

    }

    console.log( parts );

}