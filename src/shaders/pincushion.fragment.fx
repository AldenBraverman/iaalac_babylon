precision highp float;

varying vec2 vUV;
uniform sampler2D textureSampler;
uniform float time;

void main(void) 
{
    vec2 uv = vUV - vec2(0.5);
    float uva = atan(uv.x, uv.y);
    float uvd = sqrt(dot(uv, uv));
    // k = negative for pincushion, positive for barrel
    float k = sin(time);
    uvd = uvd*(1.0 + k*uvd*uvd);

    gl_FragColor = texture(textureSampler, vec2(0.5) + vec2(sin(uva), cos(uva))*uvd);
}