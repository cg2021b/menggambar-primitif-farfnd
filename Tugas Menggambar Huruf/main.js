function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    // mendefinisikan vertex
    var vertices = [
        // X, Y,     R, G, B

        // SEGITIGA BERWARNA //

        // kiri bawah
        -0.3, 0.6,   0.1, 1.0, 0.6,
        -0.3, -0.6,  0.7, 0.0, 1.0,
        0.3, -0.6,   1.0, 1.0, 0.0,

        // kanan atas
        0.3, 0.6,    0.7, 0.0, 1.0,
        -0.3, 0.6,   0.1, 1.0, 0.6,
        0.3, -0.6,   1.0, 1.0, 0.0,

        // NEGATIVE SPACE //

        // bawah - kanan bawah
        -0.25, -0.6, 0.5, 0.5, 0.5,
        0.6, -0.6,   0.5, 0.5, 0.5,
        0.6, 0.0,    0.5, 0.5, 0.5,

        // bawah - kiri atas
        -0.25, -0.6, 0.5, 0.5, 0.5,
        -0.25, 0.0,  0.5, 0.5, 0.5,
        0.6, 0.0,    0.5, 0.5, 0.5,

        // atas - kanan bawah
        -0.25, 0.075, 0.5, 0.5, 0.5,
        0.3, 0.525,   0.5, 0.5, 0.5,
        0.3, 0.075,   0.5, 0.5, 0.5,
        
        // atas - kiri atas
        -0.25, 0.075, 0.5, 0.5, 0.5,
        0.3, 0.525,   0.5, 0.5, 0.5,
        -0.25, 0.525, 0.5, 0.5, 0.5,
    ];

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // mendefinisikan vertex shader
    var vertexShaderCode =`
    attribute vec2 a_Position;
    attribute vec3 a_Color;
    varying vec3 v_FragColor;

    void main() {
      v_FragColor = a_Color;
      gl_Position = vec4(a_Position, 0.0, 1.0);
      gl_PointSize = 10.0;
    }`;
    
    // membuat vertex shader
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);
    
    // mendefinisikan fragment shader
    var fragmentShaderCode =`
    precision mediump float;
    varying vec3 v_FragColor;

    void main() {
        gl_FragColor = vec4(v_FragColor, 1.0);
    }`;

    // membuat fragment shader
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    var aPosition = gl.getAttribLocation(shaderProgram, 'a_Position');
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(aPosition);

	var a_Color = gl.getAttribLocation(shaderProgram, 'a_Color');
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
	gl.enableVertexAttribArray(a_Color);

    gl.clearColor(0.5, 0.5, 0.5, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

	gl.drawArrays(gl.TRIANGLES, 0, 18);
}