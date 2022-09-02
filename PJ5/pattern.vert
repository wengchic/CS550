#version 120

uniform float    uTime;          // "Time", from Animate( )
varying vec2     vST;            // texture coords
uniform int      uBotton;

const float PI =     3.14159265;
const float AMP =    0.2;        // amplitude
const float W =      2.;         // frequency

varying vec3 vN;                 // normal vector
varying vec3 vL;                 // vector from point to light
varying vec3 vE;                 // vector from point to eye

const vec3 LIGHTPOSITION = vec3( 5., 5., 0. );

void
main( )
{
    // texture
    vST = gl_MultiTexCoord0.st;
    vec3 vert = gl_Vertex.xyz;
    
    vert.x *= 0.8 * (sin(PI*uTime))+1;
    vert.y += 0.6 * (sin(PI*uTime))+1;
    vert.z += 1.  * (sin(PI*uTime))+1;

    

    // light
    //vec3 vert = gl_Vertex.xyz;
    vec4 ECposition = gl_ModelViewMatrix * vec4( vert, 1. );
    vN = normalize( gl_NormalMatrix * gl_Normal );      // normal vector
    vL = LIGHTPOSITION - ECposition.xyz;                // vector from the point to the light position
    
    vE = vec3( 0., 0., 0. ) - ECposition.xyz;           // vector from the point to the eye position
    

    // view
    gl_Position = gl_ModelViewProjectionMatrix * vec4( vert, 1. );


}