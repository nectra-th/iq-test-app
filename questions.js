// Shape descriptor factory
function S(shape, size, fill, color, extra) {
    return { shape, size: size || 'medium', fill: fill || 'solid', color: color || '#ffffff', ...extra };
}
const C = { orange: '#f7971e', green: '#2ed573', red: '#ff4757', blue: '#3498db', purple: '#9b59b6', teal: '#1abc9c', white: '#ffffff', yellow: '#ffd200', pink: '#e84393' };

const questions = [

// =============================================
// LEVEL 1 — Single obvious rule (12 questions)
// =============================================

// L1-01 Matrix: same shape per row
{ type:'matrix', difficulty:1, grid:[
    [S('circle','medium','solid',C.blue)],[S('circle','medium','solid',C.blue)],[S('circle','medium','solid',C.blue)],
    [S('square','medium','solid',C.blue)],[S('square','medium','solid',C.blue)],[S('square','medium','solid',C.blue)],
    [S('triangle','medium','solid',C.blue)],[S('triangle','medium','solid',C.blue)],null],
  options:[[S('triangle','medium','solid',C.blue)],[S('circle','medium','solid',C.blue)],[S('square','medium','solid',C.blue)],[S('diamond','medium','solid',C.blue)]],answer:0},

// L1-02 Matrix: same color per row
{ type:'matrix', difficulty:1, grid:[
    [S('circle','medium','solid',C.red)],[S('circle','medium','solid',C.red)],[S('circle','medium','solid',C.red)],
    [S('circle','medium','solid',C.green)],[S('circle','medium','solid',C.green)],[S('circle','medium','solid',C.green)],
    [S('circle','medium','solid',C.blue)],[S('circle','medium','solid',C.blue)],null],
  options:[[S('circle','medium','solid',C.blue)],[S('circle','medium','solid',C.red)],[S('circle','medium','solid',C.green)],[S('circle','medium','solid',C.yellow)]],answer:0},

// L1-03 Matrix: same fill per column
{ type:'matrix', difficulty:1, grid:[
    [S('square','medium','none',C.orange)],[S('square','medium','striped',C.orange)],[S('square','medium','solid',C.orange)],
    [S('circle','medium','none',C.orange)],[S('circle','medium','striped',C.orange)],[S('circle','medium','solid',C.orange)],
    [S('triangle','medium','none',C.orange)],[S('triangle','medium','striped',C.orange)],null],
  options:[[S('triangle','medium','solid',C.orange)],[S('triangle','medium','none',C.orange)],[S('triangle','medium','striped',C.orange)],[S('circle','medium','solid',C.orange)]],answer:0},

// L1-04 Series: increasing sides
{ type:'series', difficulty:1, sequence:[
    [S('triangle','medium','none',C.green)],[S('square','medium','none',C.green)],[S('pentagon','medium','none',C.green)],[S('hexagon','medium','none',C.green)]],
  options:[[S('heptagon','medium','none',C.green)],[S('star','medium','none',C.green)],[S('triangle','medium','none',C.green)],[S('diamond','medium','none',C.green)]],answer:0},

// L1-05 Series: rotation 90° each step
{ type:'series', difficulty:1, sequence:[
    [S('arrow','medium','solid',C.orange,{rotation:0})],[S('arrow','medium','solid',C.orange,{rotation:90})],[S('arrow','medium','solid',C.orange,{rotation:180})],[S('arrow','medium','solid',C.orange,{rotation:270})]],
  options:[[S('arrow','medium','solid',C.orange,{rotation:0})],[S('arrow','medium','solid',C.orange,{rotation:90})],[S('arrow','medium','solid',C.orange,{rotation:180})],[S('arrow','medium','solid',C.orange,{rotation:45})]],answer:0},

// L1-06 Series: growing size same shape
{ type:'series', difficulty:1, sequence:[
    [S('circle','tiny','solid',C.blue)],[S('circle','small','solid',C.blue)],[S('circle','medium','solid',C.blue)],[S('circle','large','solid',C.blue)]],
  options:[[S('circle','xlarge','solid',C.blue)],[S('circle','medium','solid',C.blue)],[S('circle','small','solid',C.blue)],[S('square','xlarge','solid',C.blue)]],answer:0},

// L1-07 Odd-one-out: 4 filled, 1 outline
{ type:'odd-one-out', difficulty:1, figures:[
    [S('circle','large','solid',C.teal)],[S('circle','large','solid',C.teal)],[S('circle','large','none',C.teal)],[S('circle','large','solid',C.teal)],[S('circle','large','solid',C.teal)]],answer:2},

// L1-08 Odd-one-out: 4 squares, 1 circle
{ type:'odd-one-out', difficulty:1, figures:[
    [S('square','large','solid',C.orange)],[S('square','large','solid',C.orange)],[S('square','large','solid',C.orange)],[S('circle','large','solid',C.orange)],[S('square','large','solid',C.orange)]],answer:3},

// L1-09 Odd-one-out: 4 same color, 1 different
{ type:'odd-one-out', difficulty:1, figures:[
    [S('triangle','large','solid',C.blue)],[S('triangle','large','solid',C.blue)],[S('triangle','large','solid',C.red)],[S('triangle','large','solid',C.blue)],[S('triangle','large','solid',C.blue)]],answer:2},

// L1-10 Matrix: size per column
{ type:'matrix', difficulty:1, grid:[
    [S('square','small','solid',C.teal)],[S('square','medium','solid',C.teal)],[S('square','large','solid',C.teal)],
    [S('circle','small','solid',C.teal)],[S('circle','medium','solid',C.teal)],[S('circle','large','solid',C.teal)],
    [S('diamond','small','solid',C.teal)],[S('diamond','medium','solid',C.teal)],null],
  options:[[S('diamond','large','solid',C.teal)],[S('diamond','small','solid',C.teal)],[S('circle','large','solid',C.teal)],[S('square','large','solid',C.teal)]],answer:0},

// L1-11 Series: counting 1,2,3,4,?
{ type:'series', difficulty:1, sequence:[
    [S('dot','small','solid',C.yellow,{count:1})],[S('dot','small','solid',C.yellow,{count:2})],[S('dot','small','solid',C.yellow,{count:3})],[S('dot','small','solid',C.yellow,{count:4})]],
  options:[[S('dot','small','solid',C.yellow,{count:5})],[S('dot','small','solid',C.yellow,{count:6})],[S('dot','small','solid',C.yellow,{count:4})],[S('dot','small','solid',C.yellow,{count:3})]],answer:0},

// L1-12 Rotation: simple arrow 90°
{ type:'rotation', difficulty:1, original:[S('arrow','large','solid',C.green)],transform:'rotate90',
  options:[[S('arrow','large','solid',C.green,{rotation:90})],[S('arrow','large','solid',C.green,{rotation:180})],[S('arrow','large','solid',C.green,{rotation:270})],[S('arrow','large','solid',C.green)]],answer:0},

// =============================================
// LEVEL 2 — Single rule, less obvious (12 questions)
// =============================================

// L2-01 Matrix: color cycling O,G,B per row shifted
{ type:'matrix', difficulty:2, grid:[
    [S('square','medium','solid',C.orange)],[S('square','medium','solid',C.green)],[S('square','medium','solid',C.blue)],
    [S('square','medium','solid',C.green)],[S('square','medium','solid',C.blue)],[S('square','medium','solid',C.orange)],
    [S('square','medium','solid',C.blue)],[S('square','medium','solid',C.orange)],null],
  options:[[S('square','medium','solid',C.green)],[S('square','medium','solid',C.blue)],[S('square','medium','solid',C.orange)],[S('square','medium','solid',C.red)]],answer:0},

// L2-02 Matrix: counting (r+c+1) dots
{ type:'matrix', difficulty:2, grid:[
    [S('dot','tiny','solid',C.yellow,{count:1})],[S('dot','tiny','solid',C.yellow,{count:2})],[S('dot','tiny','solid',C.yellow,{count:3})],
    [S('dot','tiny','solid',C.yellow,{count:2})],[S('dot','tiny','solid',C.yellow,{count:3})],[S('dot','tiny','solid',C.yellow,{count:4})],
    [S('dot','tiny','solid',C.yellow,{count:3})],[S('dot','tiny','solid',C.yellow,{count:4})],null],
  options:[[S('dot','tiny','solid',C.yellow,{count:5})],[S('dot','tiny','solid',C.yellow,{count:4})],[S('dot','tiny','solid',C.yellow,{count:6})],[S('dot','tiny','solid',C.yellow,{count:3})]],answer:0},

// L2-03 Matrix: rotation per column (0,90,180)
{ type:'matrix', difficulty:2, grid:[
    [S('arrow','medium','solid',C.orange,{rotation:0})],[S('arrow','medium','solid',C.orange,{rotation:90})],[S('arrow','medium','solid',C.orange,{rotation:180})],
    [S('arrow','medium','solid',C.green,{rotation:0})],[S('arrow','medium','solid',C.green,{rotation:90})],[S('arrow','medium','solid',C.green,{rotation:180})],
    [S('arrow','medium','solid',C.blue,{rotation:0})],[S('arrow','medium','solid',C.blue,{rotation:90})],null],
  options:[[S('arrow','medium','solid',C.blue,{rotation:180})],[S('arrow','medium','solid',C.blue,{rotation:270})],[S('arrow','medium','solid',C.green,{rotation:180})],[S('arrow','medium','solid',C.orange,{rotation:180})]],answer:0},

// L2-04 Series: alternating shape + growing
{ type:'series', difficulty:2, sequence:[
    [S('circle','small','solid',C.blue)],[S('square','medium','solid',C.blue)],[S('circle','large','solid',C.blue)],[S('square','xlarge','solid',C.blue)]],
  options:[[S('circle',50,'solid',C.blue)],[S('square',50,'solid',C.blue)],[S('circle','xlarge','solid',C.blue)],[S('triangle',50,'solid',C.blue)]],answer:0},

// L2-05 Series: doubling dots 1,2,4,8,?
{ type:'series', difficulty:2, sequence:[
    [S('dot','small','solid',C.yellow,{count:1})],[S('dot','small','solid',C.yellow,{count:2})],[S('dot','small','solid',C.yellow,{count:4})],[S('dot','small','solid',C.yellow,{count:8})]],
  options:[[S('dot','tiny','solid',C.yellow,{count:16})],[S('dot','tiny','solid',C.yellow,{count:12})],[S('dot','tiny','solid',C.yellow,{count:10})],[S('dot','tiny','solid',C.yellow,{count:6})]],answer:0},

// L2-06 Series: fill progression none→striped→solid repeating
{ type:'series', difficulty:2, sequence:[
    [S('hexagon','medium','none',C.purple)],[S('hexagon','medium','striped',C.purple)],[S('hexagon','medium','solid',C.purple)],[S('hexagon','medium','none',C.purple)]],
  options:[[S('hexagon','medium','striped',C.purple)],[S('hexagon','medium','solid',C.purple)],[S('hexagon','medium','none',C.purple)],[S('hexagon','medium','dotted',C.purple)]],answer:0},

// L2-07 Odd-one-out: 4 squares, 1 rectangle
{ type:'odd-one-out', difficulty:2, figures:[
    [S('square','large','solid',C.green)],[S('square','large','solid',C.green)],[S('square','large','solid',C.green)],[S('rect','large','solid',C.green)],[S('square','large','solid',C.green)]],answer:3},

// L2-08 Odd-one-out: 4 solid blue triangles, 1 striped red
{ type:'odd-one-out', difficulty:2, figures:[
    [S('triangle','large','solid',C.blue)],[S('triangle','large','striped',C.red)],[S('triangle','large','solid',C.blue)],[S('triangle','large','solid',C.blue)],[S('triangle','large','solid',C.blue)]],answer:1},

// L2-09 Rotation: L-shape 90°
{ type:'rotation', difficulty:2, original:[S('lshape','large','solid',C.orange)],transform:'rotate90',
  options:[[S('lshape','large','solid',C.orange,{rotation:90})],[S('lshape','large','solid',C.orange,{rotation:180})],[S('lshape','large','solid',C.orange,{rotation:270})],[S('lshape','large','solid',C.orange)]],answer:0},

// L2-10 Rotation: arrow + dot 180°
{ type:'rotation', difficulty:2, original:[S('arrow','large','solid',C.teal),S('dot','tiny','solid',C.yellow,{x:12,y:-16})],transform:'rotate180',
  options:[
    [S('arrow','large','solid',C.teal,{rotation:180}),S('dot','tiny','solid',C.yellow,{x:-12,y:16})],
    [S('arrow','large','solid',C.teal,{rotation:180}),S('dot','tiny','solid',C.yellow,{x:12,y:16})],
    [S('arrow','large','solid',C.teal,{rotation:90}),S('dot','tiny','solid',C.yellow,{x:16,y:12})],
    [S('arrow','large','solid',C.teal,{rotation:270}),S('dot','tiny','solid',C.yellow,{x:-16,y:-12})]],answer:0},

// L2-11 Matrix: fill changes per row (none→striped→solid)
{ type:'matrix', difficulty:2, grid:[
    [S('circle','medium','none',C.white)],[S('circle','medium','striped',C.white)],[S('circle','medium','solid',C.white)],
    [S('square','medium','none',C.white)],[S('square','medium','striped',C.white)],[S('square','medium','solid',C.white)],
    [S('diamond','medium','none',C.white)],[S('diamond','medium','striped',C.white)],null],
  options:[[S('diamond','medium','solid',C.white)],[S('diamond','medium','none',C.white)],[S('circle','medium','solid',C.white)],[S('diamond','medium','striped',C.white)]],answer:0},

// L2-12 Series: color cycle R,G,B,R,? + rotation 45° per step
{ type:'series', difficulty:2, sequence:[
    [S('star','medium','solid',C.red,{rotation:0})],[S('star','medium','solid',C.green,{rotation:45})],[S('star','medium','solid',C.blue,{rotation:90})],[S('star','medium','solid',C.red,{rotation:135})]],
  options:[[S('star','medium','solid',C.green,{rotation:180})],[S('star','medium','solid',C.blue,{rotation:180})],[S('star','medium','solid',C.red,{rotation:180})],[S('star','medium','solid',C.green,{rotation:135})]],answer:0},

// =============================================
// LEVEL 3 — Two rules combined (12 questions)
// =============================================

// L3-01 Matrix: shape per row + size per column
{ type:'matrix', difficulty:3, grid:[
    [S('circle','small','solid',C.teal)],[S('circle','medium','solid',C.teal)],[S('circle','large','solid',C.teal)],
    [S('square','small','solid',C.teal)],[S('square','medium','solid',C.teal)],[S('square','large','solid',C.teal)],
    [S('triangle','small','solid',C.teal)],[S('triangle','medium','solid',C.teal)],null],
  options:[[S('triangle','large','solid',C.teal)],[S('circle','large','solid',C.teal)],[S('square','large','solid',C.teal)],[S('triangle','medium','solid',C.teal)]],answer:0},

// L3-02 Matrix: shape XOR + fill XOR per row
{ type:'matrix', difficulty:3, grid:[
    [S('circle','medium','none',C.white)],[S('square','medium','striped',C.white)],[S('triangle','medium','solid',C.white)],
    [S('square','medium','solid',C.white)],[S('triangle','medium','none',C.white)],[S('circle','medium','striped',C.white)],
    [S('triangle','medium','striped',C.white)],[S('circle','medium','solid',C.white)],null],
  options:[[S('square','medium','none',C.white)],[S('square','medium','solid',C.white)],[S('circle','medium','none',C.white)],[S('triangle','medium','none',C.white)]],answer:0},

// L3-03 Matrix: color per row + fill per column
{ type:'matrix', difficulty:3, grid:[
    [S('circle','medium','none',C.red)],[S('circle','medium','striped',C.red)],[S('circle','medium','solid',C.red)],
    [S('circle','medium','none',C.green)],[S('circle','medium','striped',C.green)],[S('circle','medium','solid',C.green)],
    [S('circle','medium','none',C.blue)],[S('circle','medium','striped',C.blue)],null],
  options:[[S('circle','medium','solid',C.blue)],[S('circle','medium','none',C.blue)],[S('circle','medium','solid',C.red)],[S('circle','medium','striped',C.blue)]],answer:0},

// L3-04 Matrix: nested — outer per row, inner per column
{ type:'matrix', difficulty:3, grid:[
    [S('circle','large','none',C.purple,{inner:S('star','small','solid',C.purple)})],
    [S('circle','large','none',C.purple,{inner:S('triangle','small','solid',C.purple)})],
    [S('circle','large','none',C.purple,{inner:S('cross','small','solid',C.purple)})],
    [S('square','large','none',C.purple,{inner:S('star','small','solid',C.purple)})],
    [S('square','large','none',C.purple,{inner:S('triangle','small','solid',C.purple)})],
    [S('square','large','none',C.purple,{inner:S('cross','small','solid',C.purple)})],
    [S('diamond','large','none',C.purple,{inner:S('star','small','solid',C.purple)})],
    [S('diamond','large','none',C.purple,{inner:S('triangle','small','solid',C.purple)})],null],
  options:[
    [S('diamond','large','none',C.purple,{inner:S('cross','small','solid',C.purple)})],
    [S('diamond','large','none',C.purple,{inner:S('star','small','solid',C.purple)})],
    [S('circle','large','none',C.purple,{inner:S('cross','small','solid',C.purple)})],
    [S('square','large','none',C.purple,{inner:S('cross','small','solid',C.purple)})]],answer:0},

// L3-05 Series: alternating shape, color cycle, rotation
{ type:'series', difficulty:3, sequence:[
    [S('square','medium','solid',C.red,{rotation:0})],[S('circle','medium','solid',C.green,{rotation:45})],[S('square','medium','solid',C.blue,{rotation:90})],[S('circle','medium','solid',C.red,{rotation:135})]],
  options:[[S('square','medium','solid',C.green,{rotation:180})],[S('circle','medium','solid',C.green,{rotation:180})],[S('square','medium','solid',C.red,{rotation:180})],[S('square','medium','solid',C.blue,{rotation:180})]],answer:0},

// L3-06 Odd-one-out: 5 unique compound shapes, 4 have accent above, 1 below
{ type:'odd-one-out', difficulty:3, figures:[
    [S('square','medium','none',C.blue),S('circle','tiny','solid',C.red,{y:-18})],
    [S('circle','medium','none',C.red),S('star','tiny','solid',C.blue,{y:-18})],
    [S('hexagon','medium','none',C.green),S('triangle','tiny','solid',C.purple,{y:-18})],
    [S('diamond','medium','none',C.purple),S('cross','tiny','solid',C.green,{y:18})],
    [S('triangle','medium','none',C.orange),S('diamond','tiny','solid',C.teal,{y:-18})]],answer:3},

// L3-07 Odd-one-out: 5 nested shapes, 4 have matching outer+inner color, 1 mismatched
{ type:'odd-one-out', difficulty:3, figures:[
    [S('circle','large','none',C.red,{inner:S('star','small','solid',C.red)})],
    [S('square','large','none',C.blue,{inner:S('diamond','small','solid',C.blue)})],
    [S('triangle','large','none',C.green,{inner:S('cross','small','solid',C.red)})],
    [S('diamond','large','none',C.purple,{inner:S('circle','small','solid',C.purple)})],
    [S('hexagon','large','none',C.orange,{inner:S('triangle','small','solid',C.orange)})]],answer:2},

// L3-08 Rotation: cross + circle + triangle, 90°
{ type:'rotation', difficulty:3, original:[
    S('cross','large','striped',C.purple),S('circle','tiny','solid',C.yellow,{x:16,y:-16}),S('triangle','small','solid',C.red,{x:-14,y:14})],
  transform:'rotate90',
  options:[
    [S('cross','large','striped',C.purple,{rotation:90}),S('circle','tiny','solid',C.yellow,{x:16,y:16}),S('triangle','small','solid',C.red,{x:-14,y:-14,rotation:90})],
    [S('cross','large','striped',C.purple,{rotation:90}),S('circle','tiny','solid',C.yellow,{x:-16,y:16}),S('triangle','small','solid',C.red,{x:14,y:-14,rotation:90})],
    [S('cross','large','striped',C.purple,{rotation:180}),S('circle','tiny','solid',C.yellow,{x:-16,y:16}),S('triangle','small','solid',C.red,{x:14,y:-14,rotation:180})],
    [S('cross','large','striped',C.purple),S('circle','tiny','solid',C.yellow,{x:16,y:-16}),S('triangle','small','solid',C.red,{x:-14,y:14})]],answer:0},

// L3-09 Matrix: shape changes per row, color changes per col
{ type:'matrix', difficulty:3, grid:[
    [S('circle','medium','solid',C.red)],[S('circle','medium','solid',C.green)],[S('circle','medium','solid',C.blue)],
    [S('square','medium','solid',C.red)],[S('square','medium','solid',C.green)],[S('square','medium','solid',C.blue)],
    [S('triangle','medium','solid',C.red)],[S('triangle','medium','solid',C.green)],null],
  options:[[S('triangle','medium','solid',C.blue)],[S('triangle','medium','solid',C.red)],[S('square','medium','solid',C.blue)],[S('circle','medium','solid',C.blue)]],answer:0},

// L3-10 Series: shape grows sides + fill cycles
{ type:'series', difficulty:3, sequence:[
    [S('triangle','medium','none',C.teal)],[S('square','medium','striped',C.teal)],[S('pentagon','medium','solid',C.teal)],[S('hexagon','medium','none',C.teal)]],
  options:[[S('heptagon','medium','striped',C.teal)],[S('heptagon','medium','solid',C.teal)],[S('heptagon','medium','none',C.teal)],[S('hexagon','medium','striped',C.teal)]],answer:0},

// L3-11 Matrix: counting + color
{ type:'matrix', difficulty:3, grid:[
    [S('dot','tiny','solid',C.red,{count:1})],[S('dot','tiny','solid',C.green,{count:1})],[S('dot','tiny','solid',C.blue,{count:1})],
    [S('dot','tiny','solid',C.red,{count:2})],[S('dot','tiny','solid',C.green,{count:2})],[S('dot','tiny','solid',C.blue,{count:2})],
    [S('dot','tiny','solid',C.red,{count:3})],[S('dot','tiny','solid',C.green,{count:3})],null],
  options:[[S('dot','tiny','solid',C.blue,{count:3})],[S('dot','tiny','solid',C.blue,{count:2})],[S('dot','tiny','solid',C.red,{count:3})],[S('dot','tiny','solid',C.green,{count:3})]],answer:0},

// L3-12 Rotation: nested shape 180°
{ type:'rotation', difficulty:3, original:[S('square','large','none',C.blue,{inner:S('circle','small','solid',C.red)}),S('dot','tiny','solid',C.yellow,{x:16,y:-16})],
  transform:'rotate180',
  options:[
    [S('square','large','none',C.blue,{inner:S('circle','small','solid',C.red),rotation:180}),S('dot','tiny','solid',C.yellow,{x:-16,y:16})],
    [S('square','large','none',C.blue,{inner:S('circle','small','solid',C.red)}),S('dot','tiny','solid',C.yellow,{x:16,y:16})],
    [S('square','large','none',C.blue,{inner:S('circle','small','solid',C.red),rotation:90}),S('dot','tiny','solid',C.yellow,{x:16,y:16})],
    [S('square','large','none',C.blue,{inner:S('circle','small','solid',C.red)}),S('dot','tiny','solid',C.yellow,{x:-16,y:-16})]],answer:0},

// =============================================
// LEVEL 4 — Two complex / three rules (12 questions)
// =============================================

// L4-01 Matrix: shape XOR + fill XOR + color XOR
{ type:'matrix', difficulty:4, grid:[
    [S('circle','medium','none',C.red)],[S('square','medium','striped',C.green)],[S('triangle','medium','solid',C.blue)],
    [S('triangle','medium','striped',C.blue)],[S('circle','medium','solid',C.red)],[S('square','medium','none',C.green)],
    [S('square','medium','solid',C.green)],[S('triangle','medium','none',C.blue)],null],
  options:[[S('circle','medium','striped',C.red)],[S('circle','medium','solid',C.red)],[S('circle','medium','none',C.red)],[S('square','medium','striped',C.red)]],answer:0},

// L4-02 Matrix: nested + size varies
{ type:'matrix', difficulty:4, grid:[
    [S('circle','large','none',C.white,{inner:S('star','small','solid',C.orange)})],
    [S('circle','large','none',C.white,{inner:S('cross','small','solid',C.green)})],
    [S('circle','large','none',C.white,{inner:S('diamond','small','solid',C.blue)})],
    [S('square','large','none',C.white,{inner:S('star','medium','solid',C.orange)})],
    [S('square','large','none',C.white,{inner:S('cross','medium','solid',C.green)})],
    [S('square','large','none',C.white,{inner:S('diamond','medium','solid',C.blue)})],
    [S('triangle','large','none',C.white,{inner:S('star','large','solid',C.orange)})],
    [S('triangle','large','none',C.white,{inner:S('cross','large','solid',C.green)})],null],
  options:[
    [S('triangle','large','none',C.white,{inner:S('diamond','large','solid',C.blue)})],
    [S('triangle','large','none',C.white,{inner:S('diamond','small','solid',C.blue)})],
    [S('triangle','large','none',C.white,{inner:S('star','large','solid',C.blue)})],
    [S('square','large','none',C.white,{inner:S('diamond','large','solid',C.blue)})]],answer:0},

// L4-03 Matrix: shape per row + Latin-square fill (shifted per row) + shifted rotation
// Row1: arrow  none/striped/solid   0°/90°/180°
// Row2: star   striped/solid/none   90°/180°/270°
// Row3: cross  solid/none/?         180°/270°/?    → fill=striped, rotation=360°=0°
{ type:'matrix', difficulty:4, grid:[
    [S('arrow','medium','none',C.white,{rotation:0})],[S('arrow','medium','striped',C.white,{rotation:90})],[S('arrow','medium','solid',C.white,{rotation:180})],
    [S('star','medium','striped',C.white,{rotation:90})],[S('star','medium','solid',C.white,{rotation:180})],[S('star','medium','none',C.white,{rotation:270})],
    [S('cross','medium','solid',C.white,{rotation:180})],[S('cross','medium','none',C.white,{rotation:270})],null],
  options:[[S('cross','medium','striped',C.white,{rotation:0})],[S('cross','medium','striped',C.white,{rotation:90})],[S('cross','medium','solid',C.white,{rotation:0})],[S('cross','medium','none',C.white,{rotation:0})]],answer:0},

// L4-04 Matrix: shape per row + color per column + count = row×col (multiplicative interaction)
// Row1 (×1): circle  1 red, 2 green, 3 blue
// Row2 (×2): square  2 red, 4 green, 6 blue
// Row3 (×3): triangle 3 red, 6 green, ? blue → 9
{ type:'matrix', difficulty:4, grid:[
    [S('circle','tiny','solid',C.red,{count:1})],[S('circle','tiny','solid',C.green,{count:2})],[S('circle','tiny','solid',C.blue,{count:3})],
    [S('square','tiny','solid',C.red,{count:2})],[S('square','tiny','solid',C.green,{count:4})],[S('square','tiny','solid',C.blue,{count:6})],
    [S('triangle','tiny','solid',C.red,{count:3})],[S('triangle','tiny','solid',C.green,{count:6})],null],
  options:[[S('triangle','tiny','solid',C.blue,{count:9})],[S('triangle','tiny','solid',C.blue,{count:8})],[S('triangle','tiny','solid',C.blue,{count:6})],[S('triangle','tiny','solid',C.red,{count:9})]],answer:0},

// L4-05 Series: 3 attributes changing — shape/color/rotation
{ type:'series', difficulty:4, sequence:[
    [S('circle','medium','solid',C.red,{rotation:0})],[S('square','medium','solid',C.green,{rotation:90})],[S('triangle','medium','solid',C.blue,{rotation:180})],[S('diamond','medium','solid',C.red,{rotation:270})]],
  options:[[S('pentagon','medium','solid',C.green,{rotation:0})],[S('pentagon','medium','solid',C.blue,{rotation:0})],[S('circle','medium','solid',C.green,{rotation:0})],[S('pentagon','medium','solid',C.red,{rotation:0})]],answer:0},

// L4-06 Series: nested — outer stays, inner cycles shape, fill cycles
{ type:'series', difficulty:4, sequence:[
    [S('circle','large','none',C.white,{inner:S('star','small','none',C.orange)})],
    [S('circle','large','none',C.white,{inner:S('cross','small','striped',C.orange)})],
    [S('circle','large','none',C.white,{inner:S('triangle','small','solid',C.orange)})],
    [S('circle','large','none',C.white,{inner:S('diamond','small','none',C.orange)})]],
  options:[
    [S('circle','large','none',C.white,{inner:S('hexagon','small','striped',C.orange)})],
    [S('circle','large','none',C.white,{inner:S('hexagon','small','solid',C.orange)})],
    [S('circle','large','none',C.white,{inner:S('star','small','striped',C.orange)})],
    [S('circle','large','none',C.white,{inner:S('hexagon','small','none',C.orange)})]],answer:0},

// L4-07 Odd-one-out: 5 unique nested, 4 have outline outer+solid inner, 1 has solid outer+outline inner
{ type:'odd-one-out', difficulty:4, figures:[
    [S('circle','large','none',C.red,{inner:S('star','small','solid',C.orange)})],
    [S('square','large','none',C.blue,{inner:S('circle','small','solid',C.green)})],
    [S('triangle','large','solid',C.green,{inner:S('cross','small','none',C.white)})],
    [S('diamond','large','none',C.purple,{inner:S('triangle','small','solid',C.red)})],
    [S('hexagon','large','none',C.orange,{inner:S('diamond','small','solid',C.blue)})]],answer:2},

// L4-08 Odd-one-out: 5 unique shapes+dots, 4 dots top-right, 1 dot top-left
{ type:'odd-one-out', difficulty:4, figures:[
    [S('square','medium','solid',C.blue),S('dot','tiny','solid',C.yellow,{x:14,y:-14})],
    [S('circle','medium','solid',C.red),S('dot','tiny','solid',C.yellow,{x:14,y:-14})],
    [S('triangle','medium','solid',C.green),S('dot','tiny','solid',C.yellow,{x:-14,y:-14})],
    [S('hexagon','medium','solid',C.purple),S('dot','tiny','solid',C.yellow,{x:14,y:-14})],
    [S('diamond','medium','solid',C.orange),S('dot','tiny','solid',C.yellow,{x:14,y:-14})]],answer:2},

// L4-09 Rotation: compound 3 shapes, 270°
{ type:'rotation', difficulty:4, original:[
    S('diamond','large','none',C.teal),S('dot','tiny','solid',C.red,{x:0,y:-20}),S('cross','small','solid',C.yellow,{x:16,y:10})],
  transform:'rotate270',
  options:[
    [S('diamond','large','none',C.teal,{rotation:270}),S('dot','tiny','solid',C.red,{x:20,y:0}),S('cross','small','solid',C.yellow,{x:-10,y:16,rotation:270})],
    [S('diamond','large','none',C.teal,{rotation:270}),S('dot','tiny','solid',C.red,{x:-20,y:0}),S('cross','small','solid',C.yellow,{x:10,y:-16,rotation:270})],
    [S('diamond','large','none',C.teal,{rotation:90}),S('dot','tiny','solid',C.red,{x:-20,y:0}),S('cross','small','solid',C.yellow,{x:10,y:-16,rotation:90})],
    [S('diamond','large','none',C.teal,{rotation:270}),S('dot','tiny','solid',C.red,{x:20,y:0}),S('cross','small','solid',C.yellow,{x:10,y:16,rotation:270})]],answer:0},

// L4-10 Matrix: shape per row + size per column + Latin-square fill (shifted per row)
// Row1: circle  none/striped/solid     small/medium/large
// Row2: square  striped/solid/none     small/medium/large
// Row3: triangle solid/none/?          small/medium/large   → fill=striped
{ type:'matrix', difficulty:4, grid:[
    [S('circle','small','none',C.orange)],[S('circle','medium','striped',C.orange)],[S('circle','large','solid',C.orange)],
    [S('square','small','striped',C.orange)],[S('square','medium','solid',C.orange)],[S('square','large','none',C.orange)],
    [S('triangle','small','solid',C.orange)],[S('triangle','medium','none',C.orange)],null],
  options:[[S('triangle','large','striped',C.orange)],[S('triangle','large','solid',C.orange)],[S('triangle','large','none',C.orange)],[S('circle','large','striped',C.orange)]],answer:0},

// L4-11 Series: compound — size grows, inner shape changes, fill alternates
{ type:'series', difficulty:4, sequence:[
    [S('square','small','none',C.white,{inner:S('circle','tiny','solid',C.red)})],
    [S('square','medium','solid',C.white,{inner:S('triangle','tiny','solid',C.red)})],
    [S('square','large','none',C.white,{inner:S('diamond','small','solid',C.red)})],
    [S('square','xlarge','solid',C.white,{inner:S('star','small','solid',C.red)})]],
  options:[
    [S('square',50,'none',C.white,{inner:S('cross','medium','solid',C.red)})],
    [S('square',50,'solid',C.white,{inner:S('cross','medium','solid',C.red)})],
    [S('square',50,'none',C.white,{inner:S('hexagon','medium','solid',C.red)})],
    [S('square',50,'solid',C.white,{inner:S('circle','medium','solid',C.red)})]],answer:0},

// L4-12 Odd-one-out: nested shapes — 4 have inner with +1 side vs outer, 1 has inner with fewer sides
{ type:'odd-one-out', difficulty:4, figures:[
    [S('triangle','large','none',C.red,{inner:S('square','small','solid',C.red)})],
    [S('square','large','none',C.green,{inner:S('pentagon','small','solid',C.green)})],
    [S('pentagon','large','none',C.blue,{inner:S('hexagon','small','solid',C.blue)})],
    [S('hexagon','large','none',C.orange,{inner:S('triangle','small','solid',C.orange)})],
    [S('diamond','large','none',C.purple,{inner:S('pentagon','small','solid',C.purple)})]],answer:3},

// =============================================
// LEVEL 5 — Multiple overlapping rules + near-miss distractors (12 questions)
// =============================================

// L5-01 Matrix: 3 attributes XOR per row (shape, fill, color) — all 3 unique
{ type:'matrix', difficulty:5, grid:[
    [S('circle','medium','solid',C.red)],[S('square','medium','none',C.blue)],[S('triangle','medium','striped',C.green)],
    [S('square','medium','striped',C.red)],[S('triangle','medium','solid',C.blue)],[S('circle','medium','none',C.green)],
    [S('triangle','medium','none',C.red)],[S('circle','medium','striped',C.blue)],null],
  options:[
    [S('square','medium','solid',C.green)],
    [S('square','medium','none',C.green)],
    [S('square','medium','striped',C.green)],
    [S('circle','medium','solid',C.green)]],answer:0},

// L5-02 Matrix: shape per row + size per col + fill diagonal
{ type:'matrix', difficulty:5, grid:[
    [S('circle','small','none',C.white)],[S('circle','medium','striped',C.white)],[S('circle','large','solid',C.white)],
    [S('square','small','striped',C.white)],[S('square','medium','solid',C.white)],[S('square','large','none',C.white)],
    [S('triangle','small','solid',C.white)],[S('triangle','medium','none',C.white)],null],
  options:[[S('triangle','large','striped',C.white)],[S('triangle','large','solid',C.white)],[S('triangle','large','none',C.white)],[S('circle','large','striped',C.white)]],answer:0},

// L5-03 Matrix: nested + color rotate + inner shape XOR
{ type:'matrix', difficulty:5, grid:[
    [S('circle','large','none',C.red,{inner:S('star','small','solid',C.red)})],
    [S('circle','large','none',C.red,{inner:S('cross','small','solid',C.red)})],
    [S('circle','large','none',C.red,{inner:S('diamond','small','solid',C.red)})],
    [S('square','large','none',C.green,{inner:S('cross','small','solid',C.green)})],
    [S('square','large','none',C.green,{inner:S('diamond','small','solid',C.green)})],
    [S('square','large','none',C.green,{inner:S('star','small','solid',C.green)})],
    [S('triangle','large','none',C.blue,{inner:S('diamond','small','solid',C.blue)})],
    [S('triangle','large','none',C.blue,{inner:S('star','small','solid',C.blue)})],null],
  options:[
    [S('triangle','large','none',C.blue,{inner:S('cross','small','solid',C.blue)})],
    [S('triangle','large','none',C.blue,{inner:S('diamond','small','solid',C.blue)})],
    [S('triangle','large','none',C.green,{inner:S('cross','small','solid',C.green)})],
    [S('square','large','none',C.blue,{inner:S('cross','small','solid',C.blue)})]],answer:0},

// L5-04 Matrix: rotation + count + color
{ type:'matrix', difficulty:5, grid:[
    [S('arrow','medium','solid',C.red,{rotation:0,count:1})],[S('arrow','medium','solid',C.green,{rotation:90,count:2})],[S('arrow','medium','solid',C.blue,{rotation:180,count:3})],
    [S('arrow','medium','solid',C.green,{rotation:90,count:2})],[S('arrow','medium','solid',C.blue,{rotation:180,count:3})],[S('arrow','medium','solid',C.red,{rotation:270,count:4})],
    [S('arrow','medium','solid',C.blue,{rotation:180,count:3})],[S('arrow','medium','solid',C.red,{rotation:270,count:4})],null],
  options:[
    [S('arrow','medium','solid',C.green,{rotation:0,count:5})],
    [S('arrow','medium','solid',C.green,{rotation:0,count:4})],
    [S('arrow','medium','solid',C.blue,{rotation:0,count:5})],
    [S('arrow','medium','solid',C.red,{rotation:0,count:5})]],answer:0},

// L5-05 Series: 4 attributes cycle with different periods
{ type:'series', difficulty:5, sequence:[
    [S('circle','small','none',C.red,{rotation:0})],
    [S('square','medium','striped',C.green,{rotation:90})],
    [S('triangle','large','solid',C.blue,{rotation:180})],
    [S('circle','small','none',C.red,{rotation:270})]],
  options:[
    [S('square','medium','striped',C.green,{rotation:0})],
    [S('square','medium','striped',C.blue,{rotation:0})],
    [S('triangle','large','solid',C.green,{rotation:0})],
    [S('square','large','none',C.green,{rotation:0})]],answer:0},

// L5-06 Series: 4 attributes cycle simultaneously — shape +1 side, fill/color/size all cycle period 3
// Shape:  tri→sq→pent→hex→hept  (sides +1)
// Size:   small→medium→large→small→medium  (cycle 3)
// Fill:   solid→none→striped→solid→none  (cycle 3)
// Color:  red→blue→green→red→blue  (cycle 3)
{ type:'series', difficulty:5, sequence:[
    [S('triangle','small','solid',C.red)],[S('square','medium','none',C.blue)],[S('pentagon','large','striped',C.green)],[S('hexagon','small','solid',C.red)]],
  options:[[S('heptagon','medium','none',C.blue)],[S('heptagon','medium','solid',C.blue)],[S('heptagon','large','none',C.blue)],[S('heptagon','medium','none',C.green)]],answer:0},

// L5-07 Odd-one-out: 5 with 3 attributes, 4 share a hidden rule, 1 breaks it
{ type:'odd-one-out', difficulty:5, figures:[
    [S('circle','large','solid',C.red,{inner:S('square','small','none',C.white)})],
    [S('square','large','solid',C.blue,{inner:S('circle','small','none',C.white)})],
    [S('triangle','large','solid',C.green,{inner:S('diamond','small','none',C.white)})],
    [S('diamond','large','solid',C.purple,{inner:S('triangle','small','none',C.white)})],
    [S('hexagon','large','solid',C.teal,{inner:S('hexagon','small','none',C.white)})]],answer:4},

// L5-08 Odd-one-out: subtle — all have 2 shapes, 4 have shapes with different fills, 1 same fill
{ type:'odd-one-out', difficulty:5, figures:[
    [S('circle','medium','solid',C.white),S('square','medium','none',C.white,{x:16})],
    [S('triangle','medium','none',C.white),S('diamond','medium','solid',C.white,{x:16})],
    [S('star','medium','solid',C.white),S('cross','medium','solid',C.white,{x:16})],
    [S('hexagon','medium','solid',C.white),S('circle','medium','none',C.white,{x:16})],
    [S('pentagon','medium','none',C.white),S('triangle','medium','solid',C.white,{x:16})]],answer:2},

// L5-09 Rotation: 4 shapes compound, 90° — near-miss distractors
{ type:'rotation', difficulty:5, original:[
    S('square','large','none',C.blue),S('triangle','small','solid',C.red,{x:16,y:-16}),S('dot','tiny','solid',C.yellow,{x:-14,y:14}),S('cross','tiny','solid',C.green,{x:14,y:14})],
  transform:'rotate90',
  options:[
    [S('square','large','none',C.blue,{rotation:90}),S('triangle','small','solid',C.red,{x:16,y:16,rotation:90}),S('dot','tiny','solid',C.yellow,{x:-14,y:-14}),S('cross','tiny','solid',C.green,{x:-14,y:14,rotation:90})],
    [S('square','large','none',C.blue,{rotation:90}),S('triangle','small','solid',C.red,{x:16,y:16,rotation:90}),S('dot','tiny','solid',C.yellow,{x:14,y:-14}),S('cross','tiny','solid',C.green,{x:-14,y:14,rotation:90})],
    [S('square','large','none',C.blue,{rotation:90}),S('triangle','small','solid',C.red,{x:-16,y:16,rotation:90}),S('dot','tiny','solid',C.yellow,{x:-14,y:-14}),S('cross','tiny','solid',C.green,{x:-14,y:14,rotation:90})],
    [S('square','large','none',C.blue,{rotation:180}),S('triangle','small','solid',C.red,{x:-16,y:16,rotation:180}),S('dot','tiny','solid',C.yellow,{x:14,y:-14}),S('cross','tiny','solid',C.green,{x:-14,y:-14,rotation:180})]],answer:0},

// L5-10 Matrix: every cell unique combo — Latin square style
{ type:'matrix', difficulty:5, grid:[
    [S('circle','small','solid',C.red)],[S('square','medium','none',C.green)],[S('triangle','large','striped',C.blue)],
    [S('triangle','medium','solid',C.green)],[S('circle','large','none',C.blue)],[S('square','small','striped',C.red)],
    [S('square','large','solid',C.blue)],[S('triangle','small','none',C.red)],null],
  options:[
    [S('circle','medium','striped',C.green)],
    [S('circle','small','striped',C.green)],
    [S('circle','large','striped',C.green)],
    [S('circle','medium','solid',C.green)]],answer:0},

// L5-11 Series: nested rotation — outer rotates +45, inner rotates -90
{ type:'series', difficulty:5, sequence:[
    [S('square','large','none',C.white,{rotation:0,inner:S('arrow','small','solid',C.orange,{rotation:0})})],
    [S('square','large','none',C.white,{rotation:45,inner:S('arrow','small','solid',C.orange,{rotation:-90})})],
    [S('square','large','none',C.white,{rotation:90,inner:S('arrow','small','solid',C.orange,{rotation:-180})})],
    [S('square','large','none',C.white,{rotation:135,inner:S('arrow','small','solid',C.orange,{rotation:-270})})]],
  options:[
    [S('square','large','none',C.white,{rotation:180,inner:S('arrow','small','solid',C.orange,{rotation:-360})})],
    [S('square','large','none',C.white,{rotation:180,inner:S('arrow','small','solid',C.orange,{rotation:-270})})],
    [S('square','large','none',C.white,{rotation:135,inner:S('arrow','small','solid',C.orange,{rotation:-360})})],
    [S('square','large','none',C.white,{rotation:180,inner:S('arrow','small','solid',C.orange,{rotation:-180})})]],answer:0},

// L5-12 Matrix: size + fill + rotation all shift per cell
{ type:'matrix', difficulty:5, grid:[
    [S('star','small','none',C.yellow,{rotation:0})],[S('star','medium','striped',C.yellow,{rotation:36})],[S('star','large','solid',C.yellow,{rotation:72})],
    [S('star','medium','striped',C.yellow,{rotation:36})],[S('star','large','solid',C.yellow,{rotation:72})],[S('star','small','none',C.yellow,{rotation:108})],
    [S('star','large','solid',C.yellow,{rotation:72})],[S('star','small','none',C.yellow,{rotation:108})],null],
  options:[[S('star','medium','striped',C.yellow,{rotation:144})],[S('star','medium','solid',C.yellow,{rotation:144})],[S('star','large','striped',C.yellow,{rotation:144})],[S('star','medium','striped',C.yellow,{rotation:108})]],answer:0}

];
